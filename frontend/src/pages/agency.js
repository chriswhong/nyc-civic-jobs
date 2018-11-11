import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import numeral from 'numeral'

import Layout from '../components/layout'
import Image from '../components/image'

const formatCurrency = (number) => {
  return numeral(number).format('($0a)')
}

export default class AgencyPage extends React.Component {  
  constructor(props) {
    console.log(props.location.pathname)
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      jobs: [],
    };
  }
  
  componentDidMount() {
    const agencySlug = this.props.location.pathname.split('/agency/')[1];
    console.log('HERE', agencySlug)
    fetch(`http://localhost:3000/jobs/agency/${agencySlug}`)
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
      return <div>Loading...</div>;
    } else {
      const { agency } = jobs[0];
      const count = jobs.length;
      
      return (
        <Layout>
          <Link to="/">Back to Agency Listing</Link>
          <h3>Showing {count} job listings for {agency}</h3>
          <p>Click a job to view the full listing on NYC&apos;s offical jobs website</p>
          <div className="list-group">
            {jobs.map(job => {
              const { job_id, business_title, job_category, posting_date, salary_range_from, salary_range_to } = job;
              const date_string = moment(posting_date).fromNow()
              
              const url = `https://a127-jobs.nyc.gov/psc/nycjobs/EMPLOYEE/HRMS/c/HRS_HRAM.HRS_APP_SCHJOB.GBL?Page=HRS_APP_JBPST&Action=U&FOCUS=Applicant&SiteId=1&JobOpeningId=${job_id}&PostingSeq=1`
              
              return (
                <a href={url} key={job.job_id} className="list-group-item list-group-item-action">
                
                  <div className="d-flex w-100 justify-content-between"> 
                    <div>
                      <h5 className="mb-1">{business_title}</h5>
                      <small>Division: {job.division_work_unit}</small> 
                      <p><small>Compensation: {formatCurrency(salary_range_from)} - {formatCurrency(salary_range_to)}</small></p>
                    </div>
                    <small>{date_string}</small>
                  </div>
                  <p className="mb-1"></p>
                  <small><span className="badge badge-secondary">{job_category}</span></small>
                </a>
              )
            })}
          </div>
        </Layout>
      );
    }
  }
}
