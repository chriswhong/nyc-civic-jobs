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
    fetch(`http://localhost:3000/jobs/agency/`)
      .then(res => res.json())
      .then(
        (agencies) => {
          this.setState({
            isLoaded: true,
            agencies
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
    const { error, isLoaded, agencies } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {agencies.map(agency => (
            <li key={agency._id}>
              <Link to={`agency/${agency._id}`}>{agency._id} ({agency.count})</Link>
            </li>
          ))}
        </ul>
      );
    }
  }
}
