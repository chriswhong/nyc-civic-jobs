const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jobSchema = require('../schema/job');

// fields to return
const fields = 'job_id agency business_title division_work_unit job_category posting_date salary_range_from salary_range_to';

const Job = mongoose.model('Job', jobSchema);



// get counts by agency and category
router.get('/', function(req, res, next) {

  const posting_type = 'External';
  
  const promises = [
    Job.aggregate([
      {
        $group: {
            _id: '$agency_id',  //$region is the column name in collection
            displayName : { $first: '$agency' },
            count: {$sum: 1}
        }
      },
      { $sort: { count: -1 } },
    ]).exec(),
    Job.aggregate([
      {
        $group: {
            _id: '$job_category',  //$region is the column name in collection
            count: {$sum: 1}
        }
      },
      { $sort: { count: -1 } },
    ]).exec(),
  ];
  
  Promise.all(promises).then(([agencies, categories]) => {
    res.send({
      agencies,
      categories,
    });
  });
});

// get jobs by agency
router.get('/agency/:agency_id', function(req, res, next) {
  const { agency_id } = req.params;
  
  const posting_type = 'External';
  
  Job.find({ agency_id, posting_type }, fields, {sort: {posting_date: 'desc'}}, (err, jobs) => {
    if (err) return handleError(err);
    
    res.send(jobs);
  });
  
});




module.exports = router;
