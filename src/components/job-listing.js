import React from 'react';
import { Link } from 'gatsby';

import JobDetails from './job-details';
import './expand-collapse.css';
import './styles.css';

const JobListing = ({ entity, jobs, path }) => {
  let title = `NYC Job Category: ${entity}`;

  if (path === 'Agency') {
    // format human-readable title
    let prefix = 'the NYC';
    prefix = entity.includes('Borough President') ? 'the' : prefix;
    prefix = entity.includes('Community Board') ? '' : prefix;

    title = `Jobs at ${prefix} ${entity}`;
  }


  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{`${path} / ${entity}`}</li>
        </ol>
      </nav>
      <h2>{title}</h2>
      <p>Click a job to view the full listing on NYC&apos;s offical jobs website</p>
      <div className="list-group job-listing">
        {jobs.map((job) => {
          const {
            agency,
            job_id: jobId,
            business_title: businessTitle,
            division_work_unit: divisionWorkUnit,
          } = job;

          let subTitle = `${agency} / ${divisionWorkUnit}`;
          if (path === 'Agency') subTitle = divisionWorkUnit;

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
                    {subTitle}
                  </div>
                  <Link to={`/job/${jobId}`}>
                    <button type="button" className="btn btn-secondary btn-sm">See Job Description</button>
                  </Link>
                </div>
                <div className="col-md-4 col-sm-12">
                  <JobDetails {...job} />
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
