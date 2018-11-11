const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jobSchema = require('../schema/job');

// fields to return
const fields = 'job_id agency business_title division_work_unit job_category posting_date';

const Job = mongoose.model('Job', jobSchema);


/* GET jobs listing. */
router.get('/', function(req, res, next) {
  res.send('O HAI');
});

// get agency listing
router.get('/agency', function(req, res, next) {

  const posting_type = 'External';
  
  Job.aggregate([
        {
            $group: {
                _id: '$agencySlug',  //$region is the column name in collection
                count: {$sum: 1}
            }
        },
        { $sort: { count: -1 } },
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });  
});

// get jobs by agency
router.get('/agency/:agencySlug', function(req, res, next) {
  const { agencySlug } = req.params;
  
  const posting_type = 'External';
  
  Job.find({ agencySlug, posting_type }, fields, (err, jobs) => {
    if (err) return handleError(err);
    
    res.send(jobs);
  });
  
});




module.exports = router;
