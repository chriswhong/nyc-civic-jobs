import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

import JobDetails from './job-details';
import './expand-collapse.css';

const JobListing = ({ entity, jobs, path }) => {
  let title = `NYC Job Category: ${entity}`;

  if (path === 'Agency') {
    // format human-readable title
    let prefix = 'the NYC';
    prefix = entity.includes('Borough President') ? 'the' : prefix;
    prefix = entity.includes('Community Board') ? '' : prefix;

    title = `Jobs at ${prefix} ${entity}`;

    const acronym = jobs[0].agency_acronym;
    if (acronym) title = `${title} (${acronym})`;
  }

  return (
    <div>
      <Helmet
        title={`NYC Civic Jobs - ${title}`}
        meta={[
          { name: 'twitter:card', content: title },
          { name: 'og:description', content: title },
        ]}
      />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{`${path} / ${entity}`}</li>
        </ol>
      </nav>
      <h2>{title}</h2>
      <div>
        <p>
          <span className="badge badge-secondary">
            Showing&nbsp;
            {jobs.length}
            &nbsp;job postings
          </span>
        </p>
      </div>
      <div className="list-group job-listing">
        {jobs.map((job) => {
          const {
            agency,
            agencyAcronym,
            jobId,
            businessTitle,
            workUnit,
          } = job;

          let agencyString = agency;
          if (agencyAcronym) agencyString = `${agencyString} (${agencyAcronym})`;

          let subTitle = `${agencyString} / ${workUnit}`;
          if (path === 'Agency') subTitle = workUnit;

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
