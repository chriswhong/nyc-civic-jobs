const request = require("request");
const mongoose = require('mongoose');
const slugify = require('slugify')

const jobSchema = require('./schema/job');

require('dotenv').config();

const apiCall = 'https://data.cityofnewyork.us/resource/swhp-yxa4.json?$limit=10000';

request({
  url: apiCall,
  json: true,
}, (err, response, jobs) => {
  
  // add agencySlug to each record
  jobsWithAgencySlugs = jobs.map((job) => {
    job.agencySlug = slugify(job.agency).toLowerCase();
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
        
        // save multiple documents to the collection referenced by Book Model
        Job.collection.insertMany(jobs, function (err, docs) {
          if (err){ 
              return console.error(err);
          } else {
            console.log("Multiple documents inserted to Collection");
          }
        });
      })
   

  })
})
