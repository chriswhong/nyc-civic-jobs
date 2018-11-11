import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

export default class IndexPage extends React.Component {  
  constructor(props) {
    console.log(props.location.pathname)
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      agencies: [],
    };
  }
  
  componentDidMount() {
    fetch(`http://localhost:3000/jobs/`)
      .then(res => res.json())
      .then(
        ({agencies, categories}) => {
          this.setState({
            isLoaded: true,
            agencies,
            categories
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
    const { error, isLoaded, agencies, categories } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Layout>
          <div className="row">
            <div className="col-md-6">
              <h4>By Agency</h4>
              <ul className="list-group">
                {agencies.map(agency => (
                  
                  <Link to={`agency/${agency._id}`} key={agency._id} className="list-group-item list-group-item-action">
                    {agency.displayName} 
                    <span className="badge badge-primary badge-pill float-right">{agency.count}</span>
                  </Link>
                  
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <h4>By Category</h4>
              <ul className="list-group">
                {categories.map(category => (
                  
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
}
