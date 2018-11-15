import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import numeral from 'numeral'
import ExpandCollapse from 'react-expand-collapse';

import { LookupCategoryDisplayName } from '../../utils/process-categories';
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
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, jobs, categoryDisplayName } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <Layout>
          <div>Loading...</div>
        </Layout>
      );
    } else {

      // find position of this page's slug in category_ids, get corresponding category
      const count = jobs.length;

      return (
        <Layout>
          <JobListing
            entity={categoryDisplayName}
            jobs={jobs}
            badgeField='agency'
          />
        </Layout>
      );
    }
  }
}
