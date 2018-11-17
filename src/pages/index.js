import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      agencies: [],
      categories: [],
      agencyFilter: '',
      categoryFilter: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line
    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
    fetch(`${host}/jobs/`)
      .then(res => res.json())
      .then(
        ({ agencies, categories }) => {
          this.setState({
            isLoaded: true,
            agencies,
            categories,
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

  onAgencyFilterChange(e) {
    this.setState({ agencyFilter: e.target.value.toLowerCase() });
  }

  onCategoryFilterChange(e) {
    this.setState({ categoryFilter: e.target.value.toLowerCase() });
  }

  render() {
    const {
      error,
      isLoaded,
      agencies,
      categories,
      agencyFilter,
      categoryFilter,
    } = this.state;

    const filteredAgencies = agencies
      .filter(agency => agency.displayName.toLowerCase().includes(agencyFilter));

    const filteredCategories = categories
      .filter(category => category.displayName.toLowerCase().includes(categoryFilter));

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
        <div className="row">
          <div className="col-md-12">
            <p>Welcome to NYC Civic Jobs! Here you can view listings of NYC government jobs by agency and category, and send permalinks to individual jobs.</p>

            <p>
              <small>
This site was built with
                <a href="https://data.cityofnewyork.us/City-Government/NYC-Jobs/kpav-sd4t">NYC Open Data</a>
, and is not an offical NYC Government website.  Also, it&apos;s
                <a href="https://github.com/chriswhong/nyc-civic-jobs">open source</a>
!
              </small>
            </p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <h4>By Agency</h4>
              </div>
              <div className="col-md-6">
                <input type="search" className="form-control" placeholder="Filter agencies..." onChange={this.onAgencyFilterChange.bind(this)} />
              </div>
            </div>
            <br />

            <ul className="list-group">
              {filteredAgencies.map(agency => (

                <Link to={`agency/${agency._id}`} key={agency._id} className="list-group-item list-group-item-action">
                  {agency.displayName}
                  <span className="badge badge-primary badge-pill float-right">{agency.count}</span>
                </Link>

              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <h4>By Category</h4>
              </div>
              <div className="col-md-6">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Filter categories..."
                  onChange={this.onCategoryFilterChange.bind(this)}
                />
              </div>
            </div>
            <br />

            <ul className="list-group">
              {filteredCategories.map(category => (

                <Link to={`category/${category._id}`} key={category._id} className="list-group-item list-group-item-action">
                  {category.displayName}
                  <span className="badge badge-primary badge-pill float-right">{category.count}</span>
                </Link>

              ))}
            </ul>
          </div>
        </div>
      </Layout>

    );
  }
}
