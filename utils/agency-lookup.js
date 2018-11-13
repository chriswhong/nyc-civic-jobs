const agencies = [
  {
    id: 'LAW DEPARTMENT',
    displayName: 'Law Department',
  },
  {
    id: 'DEPT OF YOUTH & COMM DEV SRVS',
    displayName: 'Department of Youth and Community Development Services',
  },
  {
    id: 'DEPT OF ENVIRONMENT PROTECTION',
    displayName: 'Department of Environmental Protection',
    acronym: 'DEP',
  },
  {
    id: 'TAXI & LIMOUSINE COMMISSION',
    displayName: 'Taxi & Limousine Commission',
    acronym: 'TLC',
  },
  {
    id: 'OFFICE OF THE COMPTROLLER',
    displayName: 'Office of the Comptroller',
  },
  {
    id: 'DEPT OF HEALTH/MENTAL HYGIENE',
    displayName: 'Department of Health and Mental Hygiene',
    acronym: 'DOHMH',
  },
  {
    id: 'DEPT OF INFO TECH & TELECOMM',
    displayName: 'Department of Information Technology and Telecommunications',
    acronym: 'DOITT'
  },
  {
    id: 'DEPARTMENT OF TRANSPORTATION',
    displayName: 'Department of Transportation',
    acronym: 'DOT',
  },
  {
    id: 'ADMIN FOR CHILDREN\'S SVCS',
    displayName: 'Administration for Children\'s Services',
    acronym: 'ACS'
  },
  {
    id: 'DEPT OF DESIGN & CONSTRUCTION',
    displayName: 'Department of Design and Construction',
    acronym: 'DDC',
  },
  {
    id: 'NYC HOUSING AUTHORITY',
    displayName: 'NYC Housing Authority',
  },
  {
    id: 'DEPARTMENT OF INVESTIGATION',
    displayName: 'Department of Investigation',
  },
  {
    id: 'HOUSING PRESERVATION & DVLPMNT',
    displayName: 'Housing Preservation & Development',
    acronym: 'HPD'
  },
  {
    id: 'DEPT OF CITYWIDE ADMIN SVCS',
    displayName: 'Department of Citywide Administrative Services',
    acronym: 'DCAS',
  },
  {
    id: 'MAYORS OFFICE OF CONTRACT SVCS',
    displayName: 'Mayor\'s Office of Contract Services',
  },
  {
    id: 'DEPARTMENT OF CITY PLANNING',
    displayName: 'Department of City Planning',
  },
  {
    id: 'HRA/DEPT OF SOCIAL SERVICES',
    displayName: 'Human Resources Administration (HRA)/ Department of Social Services',
  },
  {
    id: 'ADMIN TRIALS AND HEARINGS',
    displayName: 'Administrative Trials and Hearings',
  },
  {
    id: 'CONSUMER AFFAIRS',
    displayName: 'Consumer Affairs',
  },
  {
    id: 'DEPARTMENT OF BUSINESS SERV.',
    displayName: 'Department of Business Services',
  },
  {
    id: 'HUMAN RIGHTS COMMISSION',
    displayName: 'Human Rights Commission',
  },
  {
    id: 'DEPARTMENT FOR THE AGING',
    displayName: 'Department for the Aging',
    acronym: 'DFTA',
  },
  {
    id: 'DEPT OF PARKS & RECREATION',
    displayName: 'Department of Parks & Recreation',
    acronym: 'DPR',
  },
  {
    id: 'NYC EMPLOYEES RETIREMENT SYS',
    displayName: 'NYC Employees Retirement System',
  },
  {
    id: 'POLICE DEPARTMENT',
    displayName: 'Police Department',
    acronym: 'NYPD',
  },
  {
    id: 'OFFICE OF MANAGEMENT & BUDGET',
    displayName: 'Office of Management and Budget',
    acronym: 'OMB',
  },
  {
    id: 'DEPARTMENT OF CORRECTION',
    displayName: 'Department of Correction',
    acronym: 'DOC'
  },
  {
    id: 'FIRE DEPARTMENT',
    displayName: 'Fire Department',
    acronym: 'FDNY',
  },
  {
    id: 'DEPARTMENT OF SANITATION',
    displayName: 'Department of Sanitiation',
    acronym: 'DSNY',
  },
  {
    id: 'OFFICE OF EMERGENCY MANAGEMENT',
    displayName: 'Office of Emergency Management',
    acronym: 'OEM',
  },
  {
    id: 'CIVILIAN COMPLAINT REVIEW BD',
    displayName: 'Civilian Complaint Review Board',
    acronym: 'CCRB',
  },
  {
    id: 'DEPARTMENT OF BUILDINGS',
    displayName: 'Department of Buildings',
    acronym: 'DOB'
  },
  {
    id: 'FINANCIAL INFO SVCS AGENCY',
    displayName: 'Financial Information Services Agency',
    acronym: 'FISA',
  },
  {
    id: 'DISTRICT ATTORNEY RICHMOND COU',
    displayName: 'Richmond County (Staten Island) District Attorney',
  },
  {
    id: 'MANHATTAN COMMUNITY BOARD #6',
    displayName: 'Manhattan Community Board 6',
  },
  {
    id: 'DEPARTMENT OF PROBATION',
    displayName: 'Department of Probation',
  },
  {
    id: 'OFF OF PAYROLL ADMINISTRATION',
    displayName: 'Office of Payroll Administration',
  },
  {
    id: 'CONFLICTS OF INTEREST BOARD',
    displayName: 'Conflicts of Interest Board',
    acronym: 'COIB'
  },
  {
    id: 'TAX COMMISSION',
    displayName: 'Tax Commmission',
  },
  {
    id: 'OFFICE OF LABOR RELATIONS',
    displayName: 'Office of Labor Relations',
  },
  {
    id: 'MANHATTAN COMMUNITY BOARD #8',
    displayName: 'Manhattan Community Board 8',
  },
  {
    id: 'NYC DEPT OF VETERANS\' SERVICES',
    displayName: 'NYC Department of Veteran\'s Services',
  },
  {
    id: 'PRESIDENT BOROUGH OF MANHATTAN',
    displayName: 'Manhattan Borough President',
  },
  {
    id: 'DEPARTMENT OF FINANCE',
    displayName: 'Department of Finance',
    acronym: 'DOF',
  },
  {
    id: 'BOARD OF CORRECTION',
    displayName: 'Board of Correction',
  },
  {
    id: 'DISTRICT ATTORNEY KINGS COUNTY',
    displayName: 'Kings County (Brooklyn) District Attorney',
  },
  {
    id: 'BUSINESS INTEGRITY COMMISSION',
    displayName: 'Business Integrity Commission',
  },
  {
    id: 'OFFICE OF THE ACTUARY',
    displayName: 'Office of the Actuary',
  },
  {
    id: 'LANDMARKS PRESERVATION COMM',
    displayName: 'Landmarks Preservation Commission',
    acronym: 'LPC',
  },
  {
    id: 'PUBLIC ADMINISTRATOR-NEW YORK',
    displayName: 'Public Administrator',
  },
  {
    id: 'BOROUGH PRESIDENT-QUEENS',
    displayName: 'Queens Borough President',
  },
  {
    id: 'OFFICE OF COLLECTIVE BARGAININ',
    displayName: 'Office of Collective Bargaining',
  },
  {
    id: 'MANHATTAN COMMUNITY BOARD #10',
    displayName: 'Manhattan Community Board 10'
  },
];

const agencyLookup = (id) => {
  return agencies.find((agency) => agency.id === id);
}

module.exports = agencyLookup;
