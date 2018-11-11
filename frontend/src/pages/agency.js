import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

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
      return (
        <ul>
          {jobs.map(job => (
            <li key={job.job_id}>
              {job.business_title} {job.division_work_unit}
            </li>
          ))}
        </ul>
      );
    }
  }
}
