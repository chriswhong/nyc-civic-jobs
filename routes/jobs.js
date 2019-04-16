const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const jobSchema = require('../schema/job');
const { LookupCategoryDisplayName } = require('../utils/process-categories');

// fields to return
const fields = 'jobId agency agencyId agencyAcronym businessTitle workUnit jobCategoryIds postingDate salaryLow salaryHigh salaryType workLocation';

const Job = mongoose.model('Job', jobSchema);
const Meta = mongoose.model('Meta', mongoose.Schema({ dataUpdatedAt: String }), 'meta');


// get counts by agency and category
router.get('/', (req, res, next) => {
  const promises = [
    Job.aggregate([
      {
        $group: {
          _id: '$agencyId', // $region is the column name in collection
          displayName: { $first: '$agency' },
          acronym: { $first: '$agencyAcronym' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]).exec(),
    Job.aggregate([
      { $unwind: '$jobCategoryIds' },
      {
        $group: {
          _id: '$jobCategoryIds', // $region is the column name in collection
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
router.get('/agency/:agencyId', (req, res, next) => {
  const { agencyId } = req.params;

  Job.find({ agencyId }, fields, { sort: { postingDate: 'desc' } }, (err, jobs) => {
    if (err) return handleError(err);

    res.send(jobs);
  });
});

// get jobs by category
router.get('/category/:categoryId', (req, res, next) => {
  const { categoryId } = req.params;

  Job.find({ jobCategoryIds: categoryId }, fields, { sort: { postingDate: 'desc' } }, (err, jobs) => {
    if (err) return handleError(err);

    res.send(jobs);
  });
});

// get one job
router.get('/id/:jobId', (req, res, next) => {
  const { jobId } = req.params;

  Job.findOne({ jobId }, `${fields} content`, (err, job) => {
    if (err) return handleError(err);

    res.send(job);
  });
});

// get one job
router.get('/meta', (req, res, next) => {
  const { job_id } = req.params;

  Meta.findOne({}, 'dataUpdatedAt', (err, meta) => {
    if (err) return handleError(err);
    const { dataUpdatedAt } = meta;
    res.send({ dataUpdatedAt });
  });
});


module.exports = router;
