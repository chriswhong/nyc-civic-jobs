import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import numeral from 'numeral'
import ExpandCollapse from 'react-expand-collapse';

import JobListing from '../components/job-listing';
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
          <JobListing
            entity={job_category}
            jobs={jobs}
            badgeField='agency'
          />
        </Layout>
      );
    }
  }
}
