import { IContactFiltersState, IFilterValuesUsers } from '../interfaces';

export const initialFiltersState: IContactFiltersState = {
  Responsible: [],
  'Contact created': [],
  'Contact updated': [],
  Origin: [],
  'First name': '',
  'Last name': '',
  'Full name': '',
  Gender: [],
  'Date of birth': [],
  Country: [],
  Region: [],
  City: [],
  Title: [],
  Li: '',
  'Social Networks': '',
  Phone: '',
  Skype: '',
  Email: '',
  Validation: '',
  Confidence: [],
  Collegue: '',
  ID: '',
  'Added to mailing': [],
  'Last touch': [],
  Sequence: '',
  Status: [],
  Opens: [],
  Views: [],
  Deliveries: [],
  Replies: [],
  Bounces: [],
  Mails: '',
  'My notes': '',
  'Sale created': [],
  Source: [],
  'Sale ID': 0,
  'Sale status': [],
  '1C Project': '',
  Company: [],
  'Company website': '',
  Industry: [],
  'Company size': '',
  'Company LinkedIn': '',
  CTO: '',
  Founded: [],
  'Company created': [],
  'Subsidiary companies': '',
  'Holding company': '',
  'Type of company': [],
  Job: '',
  'Job Skills': '',
  blacklist: ['No'],
  'Date of use': [],
  'In work': [],
  Comment: '',
  noEmail: '',
  mainBounces: [],
  responsibleRoles: [],
  hasJobs: 'Disabled',
  vacancyStatus: 'Active',
  global: {}
};

export const initialMultiFilterState = {
  Responsible: [],
  Country: [],
  Region: [],
  City: [],
  Title: [],
  Company: [],
  Industry: [],
  Source: []
};

export const initialUsersFilterState: IFilterValuesUsers = {
  'full name': '',
  'e-mail': '',
  login: '',
  roles: [],
  skype: '',
  position: '',
  status: ''
};

export const filtersReducer = (
  state: IContactFiltersState,
  action: { payload: Function }
) => {
  if (typeof action.payload === 'function') {
    return action.payload(state);
  }
  return state;
};
