import { IContactFiltersState } from '../interfaces';

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
  Position: '',
  Li: '',
  'Social Networks': '',
  Phone: '',
  Skype: '',
  'E-mail': '',
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
  Bounces: '',
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
  Comment: ''
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
