const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jobSchema = require('../schema/job');

// fields to return
const fields = 'job_id agency business_title division_work_unit job_category posting_date salary_range_from salary_range_to salary_frequency job_description';

const Job = mongoose.model('Job', jobSchema);

const posting_type = 'External';


// get counts by agency and category
router.get('/', function(req, res, next) {
  const promises = [
    Job.aggregate([
      { $match: { posting_type } },
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
      { $match: { posting_type } },
      {
        $group: {
            _id: '$category_id',  //$region is the column name in collection
            displayName : { $first: '$job_category' },
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

  Job.find({ agency_id, posting_type }, fields, {sort: {posting_date: 'desc'}}, (err, jobs) => {
    if (err) return handleError(err);

    res.send(jobs);
  });
});

// get jobs by category
router.get('/category/:category_id', function(req, res, next) {
  const { category_id } = req.params;

  Job.find({ category_id, posting_type }, fields, {sort: {posting_date: 'desc'}}, (err, jobs) => {
    if (err) return handleError(err);

    res.send(jobs);
  });
});




module.exports = router;
