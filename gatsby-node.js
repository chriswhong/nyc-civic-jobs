// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/agency/)) {
    page.matchPath = '/agency/*';

    // Update the page.
    createPage(page);
  }

  if (page.path.match(/^\/category/)) {
    page.matchPath = '/category/*';

    // Update the page.
    createPage(page);
  }

  if (page.path.match(/^\/job/)) {
    page.matchPath = '/job/*';
    // Update the page.
    createPage(page);
  }
};

exports.onPreBootstrap = () => {
  require('isomorphic-fetch'); // eslint-disable-line
};
