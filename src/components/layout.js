import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';

import icon16 from '../../static/favicon-16x16.png';
import icon32 from '../../static/favicon-32x32.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUpdatedAt: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line
    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
    fetch(`${host}/jobs/meta/`)
      .then(res => res.json())
      .then(
        ({ dataUpdatedAt }) => {
          this.setState({
            dataUpdatedAt,
          });
        },
      );
  }

  render() {
    const {
      dataUpdatedAt,
    } = this.state;

    const { children } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'og:description', content: 'NYC Civic Jobs, a simple site for browsing NYC Government Jobs' },
                { name: 'keywords', content: 'civic, jobs, job listings, employment, hiring' },
              ]}
            >
              <link
                href="https://fonts.googleapis.com/css?family=Teko"
                rel="stylesheet"
              />
              <link rel="icon" type="image/png" sizes="32x32" href={icon32} />
              <link rel="icon" type="image/png" sizes="16x16" href={icon16} />
              <html lang="en" />
            </Helmet>
            <Header
              siteTitle={data.site.siteMetadata.title}
              dataUpdatedAt={dataUpdatedAt}
            />
            <div
              style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 1.0875rem 1.45rem',
                paddingTop: 0,
              }}
            >
              {children}
            </div>
          </>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
