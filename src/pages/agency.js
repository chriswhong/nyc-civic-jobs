import React from 'react';

import JobListing from '../components/job-listing';

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
    const { props } = this;
    const agencySlug = props.location.pathname.split('/agency/')[1];
    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
    fetch(`${host}/jobs/agency/${agencySlug}`)
      .then(res => res.json())
      .then(
        (jobs) => {
          this.setState({
            isLoaded: true,
            jobs,
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
    const { error, isLoaded, jobs } = this.state;

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
    const { agency } = jobs[0];

    return (
      <JobListing
        entity={agency}
        jobs={jobs}
        path="Agency"
        badgeField="division_work_unit"
      />
    );
  }
}
