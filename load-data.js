const fetch = require('node-fetch');
const mongoose = require('mongoose');
const slugify = require('slugify');

const jobSchema = require('./schema/job');
const agencyLookup = require('./utils/agency-lookup');
const { processCategories } = require('./utils/process-categories');

require('dotenv').config();

const dataApiCall = 'https://data.cityofnewyork.us/resource/swhp-yxa4.json?$limit=10000';
const metaApiCall = 'https://data.cityofnewyork.us/api/views/metadata/v1/kpav-sd4t';

const replaceOddCharacters = string => string
  .replace(/â€œ/g, '“')
  .replace(/â€/g, '”')
  .replace(/â€™/g, '’')
  .replace(/â€˜/g, '‘')
  .replace(/â€”/g, '–')
  .replace(/â€“/g, '—')
  .replace(/â€¢/g, '-')
  .replace(/â€¦/g, '…');

(async () => {
  const response = await fetch(dataApiCall)
    .then(d => d.text())
    .catch(err => console.error(err));

  const { dataUpdatedAt } = await fetch(metaApiCall)
    .then(d => d.json())
    .catch(err => console.error(err));

  // replace oddly-encoded characters in the raw data
  const cleanJSON = JSON.parse(replaceOddCharacters(response));

  // add clean agency_id to each record
  const jobsWithAgencyData = cleanJSON.map((job) => {
    const { agency, job_category } = job;

    const { displayName } = agencyLookup(agency);
    job.agency_id = slugify(displayName, { remove: /[*+~.()'"!:@,]/g }).toLowerCase();
    job.agency = displayName;

    // convert job_categories to array
    // add clean category slug to each record
    if (job_category) {
      console.log(processCategories);
      job.job_category_ids = processCategories(job_category);
    } else {
      job.job_category_ids = ['no-category'];
    }

    return job;
  });

  console.log(jobsWithAgencyData, dataUpdatedAt)

  // make a connection
  mongoose.connect(process.env.MONGO_URI);

  // get reference to database
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('Connection Successful!');

    // compile schema to model
    const Job = mongoose.model('Job', jobSchema, 'jobs');

    // delete everything in the collection
    Job.deleteMany({}, () => {
      console.log('Deleted all documents in Collection');

      // save multiple documents to the collection referenced by Job Model
      Job.collection.insertMany(jobsWithAgencyData, (err, docs) => {
        if (err) {
          return console.error(err);
        }
        console.log('Multiple documents inserted to Collection');
      });
    });

    const Meta = mongoose
      .model('Meta', mongoose.Schema({ dataUpdatedAt: String }), 'meta');

    Meta.create({ dataUpdatedAt }, function (err, small) {
      if (err) return handleError(err);
      console.log('Saved Metadata!');
    });
  });

})();
