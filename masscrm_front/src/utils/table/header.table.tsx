import { ISortingFieldId } from 'src/interfaces/ISorting';

export const VISIBLE_RESET_FILTER: { [key: string]: boolean } = {
  'full name': false,
  'e-mail': false,
  login: false,
  roles: false,
  skype: false,
  position: false,
  Responsible: false,
  Created: false,
  Updated: false,
  'First name': false,
  'Last name': false,
  'Full name': false,
  Gender: false,
  'Date of Birth': false,
  Country: false,
  City: false,
  Region: false,
  Position: false,
  LinkedIn: false,
  'Other social networks': false,
  Phone: false,
  Skype: false,
  'E-mail': false,
  'Request validation': false,
  Confidence: false,
  Collegue: false,
  'Mailing tool': false,
  Origin: false,
  ID: false,
  'Added to mailing': false,
  'Last touch': false,
  Sequence: false,
  Status: false,
  Opens: false,
  Views: false,
  Replies: false,
  Bounces: false,
  Mails: false,
  'My notes': false,
  'Sale created': false,
  Source: false,
  'Sale ID': false,
  'Sale status': false,
  '1C Project': false,
  Comment: false,
  Company: false,
  'Company website': false,
  'Company LinkedIn': false,
  CTO: false,
  Industry: false,
  'Company size': false,
  'Type of company': false,
  'Subsidiary companies': false,
  'Holding company': false,
  'Company created': false,
  Founded: false,
  Job: false,
  'Job skills': false,
  'Job url': false
};

export const SORTING_FIELD_ID: ISortingFieldId = {
  'Contact created': 'created_at',
  'Contact updated': 'updated_at',
  'Date of birth': 'birthday',
  'Added to mailing': 'added_to_mailing',
  'Last touch': 'last_touch'
};

interface ITableHeight {
  userTable: string;
  contactTable: string;
  myContactTable: string;
  blacklistTable: string;
  exportTable: string;
}

export const OTHER_HEIGHT: ITableHeight = {
  userTable: '201px',
  contactTable: '305px',
  myContactTable: '305px',
  blacklistTable: '520px',
  exportTable: '465px'
};
