const mongoose = require('mongoose');

// define Schema
module.exports = mongoose.Schema({
  '__of_positions': String,
  'agency': String,
  'business_title': String,
  'civil_service_title': String,
  'division_work_unit': String,
  'hours_shift': String,
  'job_category': String,
  'job_description': String,
  'job_id': String,
  'level': String,
  'minimum_qual_requirements': String,
  'posting_date': String,
  'posting_type': String,
  'posting_updated': String,
  'preferred_skills': String,
  'process_date': String,
  'residency_requirement': String,
  'salary_frequency': String,
  'salary_range_from': String,
  'salary_range_to': String,
  'title_code_no': String,
  'to_apply': String,
  'work_location': String,
  'work_location_1': String,
});