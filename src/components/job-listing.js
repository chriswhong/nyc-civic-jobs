import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import numeral from 'numeral';
import ExpandCollapse from 'react-expand-collapse';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faClock, faTags } from '@fortawesome/free-solid-svg-icons';

import { LookupCategoryDisplayName } from '../../utils/process-categories';
import './expand-collapse.css';
import './styles.css';


library.add(faMoneyBillWave, faClock, faTags);

const formatCurrency = number => numeral(number).format('($0a)');

const JobListing = ({ entity, jobs }) => {
  // format human-readable title
  let prefix = 'the NYC';
  prefix = entity.includes('Borough President') ? 'the' : prefix;
  prefix = entity.includes('Community Board') ? '' : prefix;

  const title = `Jobs at ${prefix} ${entity}`;

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
        {jobs.map((job) => {
          const {
            job_id: jobId,
            business_title: businessTitle,
            job_category_ids: jobCategoryIds,
            posting_date: postingDate,
            salary_range_from: salaryRangeFrom,
            salary_range_to: salaryRangeTo,
            job_description: jobDescription,
            salary_frequency: salaryFrequency,
            division_work_unit: divisionWorkUnit,
          } = job;
          const dateString = moment(postingDate).fromNow();

          const url = `https://a127-jobs.nyc.gov/psc/nycjobs/EMPLOYEE/HRMS/c/HRS_HRAM.HRS_APP_SCHJOB.GBL?Page=HRS_APP_JBPST&Action=U&FOCUS=Applicant&SiteId=1&JobOpeningId=${jobId}&PostingSeq=1`;

          const jobCategories = jobCategoryIds.map((id) => {
            const displayName = LookupCategoryDisplayName(id);
            return (
              <small key={id}><a href={`/category/${id}`}><span className="badge badge-secondary">{displayName}</span></a></small>
            );
          });

          return (
            <div key={jobId} className="list-group-item">
              <div className="row">
                <div className="col-md-8 col-sm-12 mb-3">
                  <h4 className="mb-1">
                    {businessTitle}
                    {' '}
                    <small>
#
                      {jobId}
                    </small>
                  </h4>
                  <div className="division">
                    {divisionWorkUnit}
                  </div>
                  <ExpandCollapse
                    previewHeight="53px"
                  >
                    <p><small>{jobDescription}</small></p>
                  </ExpandCollapse>
                  <a href={url} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-secondary btn-sm">View On NYC Jobs</button></a>
                </div>
                <div className="col-md-4 col-sm-12">
                  <ul>
                    <li>
                      <FontAwesomeIcon icon="clock" />
                      <small>{dateString}</small>
                    </li>
                    <li>
                      <FontAwesomeIcon icon="money-bill-wave" />
                      <small>
                        {formatCurrency(salaryRangeFrom)}
                        {' '}
-
                        {' '}
                        {formatCurrency(salaryRangeTo)}
                        {' '}
(
                        {salaryFrequency}
)
                      </small>
                    </li>
                    <li>
                      <FontAwesomeIcon icon="tags" />
                      {jobCategories}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobListing;
