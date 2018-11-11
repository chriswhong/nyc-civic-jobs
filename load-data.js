const request = require("request");
const mongoose = require('mongoose');
const slugify = require('slugify')

const jobSchema = require('./schema/job');
const agencyLookup = require('./utils/agency-lookup');

require('dotenv').config();

const apiCall = 'https://data.cityofnewyork.us/resource/swhp-yxa4.json?$limit=10000';

request({
  url: apiCall,
  json: true,
}, (err, response, jobs) => {
  
  // add clean agency_id to each record
  jobsWithAgencyData = jobs.map((job) => {
    const { displayName } = agencyLookup(job.agency);
    job.agency_id = slugify(displayName, { remove: /[*+~.()'"!:@]/g }).toLowerCase();
    job.agency = displayName;

    return job;
  });
  
  console.log(jobsWithAgencyData)
 
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
        
        // save multiple documents to the collection referenced by Book Model
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
