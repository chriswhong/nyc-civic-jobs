const categories = [
  {
    id: 'legal',
    displayName: 'Legal',
  },
  {
    id: 'health',
    displayName: 'Health',
  },
  {
    id: 'legal-affairs',
    displayName: 'Legal Affairs',
  },
  {
    id: 'social-services',
    displayName: 'Social Services',
  },
  {
    id: 'policy-and-analysis',
    displayName: 'Policy & Analysis',
  },
  {
    id: 'maintenance-and-operations',
    displayName: 'Maintenance & Operations',
  },
  {
    id: 'policy-research-and-analysis',
    displayName: 'Policy, Research & Analysis',
  },
  {
    id: 'technology-data-and-innovation',
    displayName: 'Technology, Data & Innovation',
  },
  {
    id: 'community-and-business-services',
    displayName: 'Community & Business Services',
  },
  {
    id: 'administration-and-human-resources',
    displayName: 'Administration & Human Resources',
  },
  {
    id: 'clerical-and-administrative-support',
    displayName: 'Clerical & Administrative Support',
  },
  {
    id: 'building-operations-and-maintenance',
    displayName: 'Building Operations & Maintenance',
  },
  {
    id: 'finance-accounting-and-procurement',
    displayName: 'Finance, Accounting, & Procurement',
  },
  {
    id: 'public-safety-inspections-and-enforcement',
    displayName: 'Public Safety, Inspections, & Enforcement',
  },
  {
    id: 'constituent-services-and-community-programs',
    displayName: 'Constituent Services & Community Programs',
  },
  {
    id: 'communications-and-intergovernmental-affairs',
    displayName: 'Communications & Intergovernmental Affairs',
  },
  {
    id: 'information-technology-and-telecommunications',
    displayName: 'Information Technology & Telecommunications',
  },
  {
    id: 'engineering-architecture-and-planning',
    displayName: 'Engineering, Architecture, & Planning',
  },
  {
    id: 'no-category',
    displayName: 'No Category',
  },
];

const processCategories = (categoryString) => {
  // loop over categories, if exists in categoryString, push to array
  const matches =  categories.filter((d) => {
    return categoryString.includes(d.displayName)
  });

  return matches.map(d => d.id);
}

const LookupCategoryDisplayName = (id) => {
  return categories.filter(d => d.id === id)[0].displayName;
}

module.exports = {
  processCategories,
  LookupCategoryDisplayName,
};
