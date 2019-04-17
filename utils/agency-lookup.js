const agencies = [
  {
    id: 'department-of-health-and-mental-hygiene',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/NYC_Health.svg/720px-NYC_Health.svg.png',
  },
  {
    id: 'department-of-design-and-construction',
    logo: 'https://caribbeantimesnyc.com/wp-content/uploads/2018/05/NYC-DDC.png',
  },
];


const agencyLookup = (id) => {

  const match = agencies.find(agency => agency.id === id);
  console.log('match', match)

  return match ? match.logo : '';
};

module.exports = agencyLookup;
