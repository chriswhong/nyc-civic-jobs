import React from 'react';
import { Link } from 'gatsby';

const Header = () => (
  <div
    style={{
      background: '#565875',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 className="site-title" style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'Teko, sans-serif',
            fontSize: '2.5rem',
            textShadow: '1px 1px 1px rgba(179, 166, 166, 0.48)',
          }}
        >
          Civic
          <br />
Jobs
          <div className="dot-nyc">.nyc</div>
        </Link>
      </h1>
    </div>
  </div>
);

export default Header;
