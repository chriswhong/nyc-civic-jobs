import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import JobDetails from '../components/job-details';

library.add(faExternalLinkAlt);

export default class JobPage extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      job: {},
    };
  }

  componentDidMount() {
    const { props } = this;
    const jobId = props.location.pathname.split('/job/')[1];

    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
    fetch(`${host}/jobs/id/${jobId}`)
      .then(res => res.json())
      .then(
        (job) => {
          this.setState({
            isLoaded: true,
            job,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  render() {
    const {
      error, isLoaded, job,
    } = this.state;

    if (error) {
      return (
        <div>
Error:
          {error.message}
        </div>
      );
    } if (!isLoaded) {
      return (
        <div>Loading...</div>
      );
    }

    const {
      agency,
      jobId,
      businessTitle,
      workUnit,
      content,
    } = job;

    const subTitle = `${agency} / ${workUnit}`;

    const url = `https://a127-jobs.nyc.gov/psc/nycjobs/EMPLOYEE/HRMS/c/HRS_HRAM.HRS_APP_SCHJOB.GBL?Page=HRS_APP_JBPST&Action=U&FOCUS=Applicant&SiteId=1&JobOpeningId=${jobId}&PostingSeq=1`;

    return (
      <div>
        <Helmet
          title={`NYC Civic Jobs - ${businessTitle} at ${subTitle}`}
          meta={[
            { name: 'twitter:card', content: `NYC Civic Jobs - ${businessTitle} at ${subTitle}` },
            { name: 'og:description', content: 'View this job...' },
          ]}
        />
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{`Job / ${jobId}`}</li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-md-8 col-sm-12 mb-3">
              <h2 className="mb-1">
                {businessTitle}
                {' '}
              </h2>
              <div className="division">
                {subTitle}
              </div>
              <div className="content" dangerouslySetInnerHTML={{ __html: content }}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <JobDetails {...job} />
            </div>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <button type="button" className="btn btn-secondary btn-sm">
              View the Offical NYC Listing To Apply
              <FontAwesomeIcon icon="external-link-alt" />
            </button>
          </a>
        </div>
      </div>
    );
  }
}
