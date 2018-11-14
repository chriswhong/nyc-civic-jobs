import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import numeral from 'numeral'
import ExpandCollapse from 'react-expand-collapse';

import '../components/expand-collapse.css'

const formatCurrency = (number) => {
  return numeral(number).format('($0a)')
}

const JobListing = ({ entity, jobs, badgeField }) => {
  const count = jobs.length;
  return (
    <div>
      <Link to="/">Home</Link> | {entity}
      <h3>Showing {count} job listings for {entity}</h3>
      <p>Click a job to view the full listing on NYC&apos;s offical jobs website</p>
      <div className="list-group">
        {jobs.map(job => {
          const { job_id, business_title, job_category, posting_date, salary_range_from, salary_range_to, job_description, salary_frequency } = job;
          const date_string = moment(posting_date).fromNow()

          const url = `https://a127-jobs.nyc.gov/psc/nycjobs/EMPLOYEE/HRMS/c/HRS_HRAM.HRS_APP_SCHJOB.GBL?Page=HRS_APP_JBPST&Action=U&FOCUS=Applicant&SiteId=1&JobOpeningId=${job_id}&PostingSeq=1`

          return (
            <div key={job.job_id} className="list-group-item">
              <div className="row">
                <div className="col-md-12">
                  <small><span className="badge badge-secondary">{job_category}</span> {date_string}</small>
                <br/>
              </div>

                <div className="col-md-12">
                  <h4 className="mb-1">{business_title}</h4>
                  <small>Job ID: {job_id}</small><br/>
                  <small>Division: {job[badgeField]}</small>
                  <p><small>Compensation: {formatCurrency(salary_range_from)} - {formatCurrency(salary_range_to)} ({salary_frequency})</small></p>
                  <ExpandCollapse
                    previewHeight="53px"
                  >
                    <p><small>{job_description}</small></p>
                  </ExpandCollapse>
                  <a href={url} target="_blank"><button type="button" className="btn btn-secondary btn-sm">View On NYC Jobs</button></a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default JobListing
