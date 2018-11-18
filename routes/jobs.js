const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const jobSchema = require('../schema/job');
const { LookupCategoryDisplayName } = require('../utils/process-categories');

// fields to return
const fields = 'job_id agency agency_id business_title division_work_unit job_category_ids posting_date salary_range_from salary_range_to salary_frequency job_description work_location';

const Job = mongoose.model('Job', jobSchema);
const Meta = mongoose.model('Meta', mongoose.Schema({ dataUpdatedAt: String }), 'meta');

const posting_type = 'External';

// get counts by agency and category
router.get('/', (req, res, next) => {
  const promises = [
    Job.aggregate([
      { $match: { posting_type } },
      {
        $group: {
          _id: '$agency_id', // $region is the column name in collection
          displayName: { $first: '$agency' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]).exec(),
    Job.aggregate([
      { $match: { posting_type } },
      { $unwind: '$job_category_ids' },
      {
        $group: {
          _id: '$job_category_ids', // $region is the column name in collection
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]).exec(),
  ];

  Promise.all(promises).then(([agencies, categories]) => {
    // lookup and append displayName to each category
    categories = categories.map(({ _id, count }) => {
      const displayName = LookupCategoryDisplayName(_id);
      return {
        _id,
        displayName,
        count,
      };
    });

    res.send({
      agencies,
      categories,
    });
  });
});

// get jobs by agency
router.get('/agency/:agency_id', (req, res, next) => {
  const { agency_id } = req.params;

  Job.find({ agency_id, posting_type }, fields, { sort: { posting_date: 'desc' } }, (err, jobs) => {
    if (err) return handleError(err);

    res.send(jobs);
  });
});

// get jobs by category
router.get('/category/:category_id', (req, res, next) => {
  const { category_id } = req.params;

  Job.find({ job_category_ids: category_id, posting_type }, fields, { sort: { posting_date: 'desc' } }, (err, jobs) => {
    if (err) return handleError(err);

    res.send(jobs);
  });
});

// get one job
router.get('/id/:job_id', (req, res, next) => {
  const { job_id } = req.params;

  Job.findOne({ job_id }, fields, (err, job) => {
    if (err) return handleError(err);

    res.send(job);
  });
});

// get one job
router.get('/meta', (req, res, next) => {
  const { job_id } = req.params;
  console.log('hi')

  Meta.findOne({}, 'dataUpdatedAt', (err, meta) => {
    if (err) return handleError(err);
    const { dataUpdatedAt } = meta;
    res.send({ dataUpdatedAt });
  });
});


module.exports = router;
