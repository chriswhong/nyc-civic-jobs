import React from 'react';

import { LookupCategoryDisplayName } from '../../utils/process-categories';
import JobListing from '../components/job-listing';
import Layout from '../components/layout';

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
    const categorySlug = props.location.pathname.split('/category/')[1];
    const categoryDisplayName = LookupCategoryDisplayName(categorySlug);

    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
    fetch(`${host}/jobs/category/${categorySlug}`)
      .then(res => res.json())
      .then(
        (jobs) => {
          this.setState({
            isLoaded: true,
            jobs,
            categoryDisplayName,
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
      error, isLoaded, jobs, categoryDisplayName,
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
        <Layout>
          <div>Loading...</div>
        </Layout>
      );
    }

    return (
      <Layout>
        <JobListing
          entity={categoryDisplayName}
          jobs={jobs}
          badgeField="agency"
        />
      </Layout>
    );
  }
}
