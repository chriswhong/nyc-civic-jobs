import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import numeral from 'numeral'
import ExpandCollapse from 'react-expand-collapse';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave, faClock, faTags } from '@fortawesome/free-solid-svg-icons'

import { LookupCategoryDisplayName } from '../../utils/process-categories'
import '../components/expand-collapse.css'
import '../components/styles.css'


library.add(faMoneyBillWave,faClock, faTags);

const formatCurrency = (number) => {
  return numeral(number).format('($0a)')
}

const JobListing = ({ entity, jobs, badgeField }) => {

  // format human-readable title
  let prefix = 'the NYC';
  prefix = entity.includes('Borough President') ? 'the' : prefix;
  prefix = entity.includes('Community Board') ? '' : prefix;

  const title = `Jobs at ${prefix} ${entity}`;
  const count = jobs.length;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{entity}</li>
        </ol>
      </nav>
      <h2>{title}</h2>
      <p>Click a job to view the full listing on NYC&apos;s offical jobs website</p>
      <div className="list-group job-listing">
        {jobs.map(job => {
          const { agency, agency_id, job_id, business_title, job_category_ids, posting_date, salary_range_from, salary_range_to, job_description, salary_frequency, division_work_unit} = job;
          const date_string = moment(posting_date).fromNow()

          const url = `https://a127-jobs.nyc.gov/psc/nycjobs/EMPLOYEE/HRMS/c/HRS_HRAM.HRS_APP_SCHJOB.GBL?Page=HRS_APP_JBPST&Action=U&FOCUS=Applicant&SiteId=1&JobOpeningId=${job_id}&PostingSeq=1`

          const jobCategories = job_category_ids.map(id => {
            const displayName = LookupCategoryDisplayName(id);
            return (
              <small key={id}><a href={`/category/${id}`}><span className="badge badge-secondary">{displayName}</span></a></small>
            )
          })

          return (
            <div key={job_id} className="list-group-item">
              <div className="row">
                <div className="col-md-8 col-sm-12 mb-3">
                  <h4 className="mb-1">{business_title} <small>#{job_id}</small></h4>
                  <div className="division">
                    {division_work_unit}
                  </div>
                  <ExpandCollapse
                    previewHeight="53px"
                  >
                    <p><small>{job_description}</small></p>
                  </ExpandCollapse>
                  <a href={url} target="_blank"><button type="button" className="btn btn-secondary btn-sm">View On NYC Jobs</button></a>
                </div>
                <div className="col-md-4 col-sm-12">
                  <ul>
                    <li>
                      <FontAwesomeIcon icon="clock" />
                      <small>{date_string}</small>
                    </li>
                    <li>
                      <FontAwesomeIcon icon="money-bill-wave" />
                      <small>{formatCurrency(salary_range_from)} - {formatCurrency(salary_range_to)} ({salary_frequency})</small>
                    </li>
                    <li>
                      <FontAwesomeIcon icon="tags" />
                      {jobCategories}
                    </li>
                  </ul>
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
