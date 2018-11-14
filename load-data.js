const request = require("request");
const mongoose = require('mongoose');
const slugify = require('slugify')

const jobSchema = require('./schema/job');
const agencyLookup = require('./utils/agency-lookup');

require('dotenv').config();

const apiCall = 'https://data.cityofnewyork.us/resource/swhp-yxa4.json?$limit=10000';

const replaceOddCharacters = (string) => {
  return string
    .replace(/â€œ/g, '“')
    .replace(/â€/g, '”')
    .replace(/â€™/g, '’')
    .replace(/â€˜/g, '‘')
    .replace(/â€”/g, '–')
    .replace(/â€“/g, '—')
    .replace(/â€¢/g, '-')
    .replace(/â€¦/g, '…');
};

request({
  url: apiCall,
}, (err, response, rawJSON) => {
  // replace oddly-encoded characters in the raw data
  const cleanJSON = JSON.parse(replaceOddCharacters(rawJSON));
    
  // add clean agency_id to each record
  jobsWithAgencyData = cleanJSON.map((job) => {
    const { agency, job_category } = job;

    const { displayName } = agencyLookup(agency);
    job.agency_id = slugify(displayName, { remove: /[*+~.()'"!:@,]/g }).toLowerCase();
    job.agency = displayName;
    
    // add clean category slug to each record
    if (job_category) {
      job.category_id = slugify(job_category, { remove: /[*+~.()'"!:@,]/g }).toLowerCase();
    } else {
      job.category_id = 'no-category'
      job.job_category = 'No Category'
    }
  
    return job;
  });
   
  // make a connection
  mongoose.connect(process.env.MONGO_URI);
   
  // get reference to database
  var db = mongoose.connection;
   
  db.on('error', console.error.bind(console, 'connection error:'));
   
  db.once('open', function() {
      console.log("Connection Successful!");
   
      // compile schema to model
      var Job = mongoose.model('Job', jobSchema, 'jobs');
      
      // delete everything in the collection 
      Job.deleteMany({}, () => {
        console.log('Deleted all documents in Collection')
        
        // save multiple documents to the collection referenced by Job Model
        Job.collection.insertMany(jobsWithAgencyData, function (err, docs) {
          if (err){ 
              return console.error(err);
          } else {
            console.log("Multiple documents inserted to Collection");
          }
        });
      })
  })
})
