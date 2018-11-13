import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import numeral from 'numeral'
import ExpandCollapse from 'react-expand-collapse';

import Layout from '../components/layout'
import Image from '../components/image'

const formatCurrency = (number) => {
  return numeral(number).format('($0a)')
}

export default class AgencyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      jobs: [],
    };
  }

  componentDidMount() {
    const categorySlug = this.props.location.pathname.split('/category/')[1];
    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
    fetch(`${host}/jobs/category/${categorySlug}`)
      .then(res => res.json())
      .then(
        (jobs) => {
          this.setState({
            isLoaded: true,
            jobs
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, jobs } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <Layout>
          <div>Loading...</div>
        </Layout>
      );
    } else {
      const { job_category } = jobs[0];
      const count = jobs.length;

      return (
        <Layout>
          <Link to="/">Home</Link> | {job_category}
          <h3>Showing {count} job listings for category {job_category}</h3>
          <p>Click a job to view the full listing on NYC&apos;s offical jobs website</p>
          <div className="list-group">
            {jobs.map(job => {
              const { job_id, agency, business_title, job_category, posting_date, salary_range_from, salary_range_to, job_description, salary_frequency } = job;
              const date_string = moment(posting_date).fromNow()

              const url = `https://a127-jobs.nyc.gov/psc/nycjobs/EMPLOYEE/HRMS/c/HRS_HRAM.HRS_APP_SCHJOB.GBL?Page=HRS_APP_JBPST&Action=U&FOCUS=Applicant&SiteId=1&JobOpeningId=${job_id}&PostingSeq=1`

              return (
                <div key={job.job_id} className="list-group-item">
                  <div className="row">
                    <div className="col-md-12">
                      <small><span className="badge badge-secondary">{agency}</span> {date_string}</small>
                    <br/>
                  </div>

                    <div className="col-md-12">
                      <h4 className="mb-1">{business_title}</h4>
                      <small>Division: {job.division_work_unit}</small>
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
        </Layout>
      );
    }
  }
}
