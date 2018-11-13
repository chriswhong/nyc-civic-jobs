A gatsby site + express api for browsing NYC government job listings.

### Why?

[https://a127-jobs.nyc.gov/](https://a127-jobs.nyc.gov/) is difficult to use.  

NYC Civic Jobs provides simple lists of jobs by agency and category, plus links to the offical listings.

### Help Wanted

I am not very good at design & layout, and need some help from a UX/Content designer.  Hit me up on Twitter if you'd like to help!

### Data

Data comes from the [NYC Open Data Portal](https://data.cityofnewyork.us/City-Government/NYC-Jobs/kpav-sd4t) and are loaded into mongodb using `load-data.js`.  Ensure `MONGO_URI` exists in your `.env` file, then run `npm load-data.js`.

TODO: Automate data update

### Development

- Clone this repo `git clone https://github.com/chriswhong/nyc-civic-jobs.git`
- Install dependencies `cd nyc-civic-jobs && npm install`
- Start the express server `npm run develop-server`
- Start the gatsby development server `gatsby develop`
- Add `MONGO_URI` to `.env` so the api can connect to the database
- Test api calls at `localhost:3000`
- Test the frontend app at `localhost:8000`

### Deployment

Deploy to dokku/heroku with a git push.  The postinstall script will will build the gatsby site, and then start the express server.
