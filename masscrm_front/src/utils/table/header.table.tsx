import { ISortingFieldId } from 'src/interfaces/ISorting';
import { FiltersStateType } from '../../interfaces';
import { deleteEmptyFields } from '../form/objectHelpers';

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
  Email: false,
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
  'Last touch': 'last_touch',
  'Date of use': 'date_of_use'
};

interface ITableHeight {
  userTable: string;
  dailyTable: string;
  contactTable: string;
  myContactTable: string;
  blacklistTable: string;
  exportTable: string;
}

export const OTHER_HEIGHT: ITableHeight = {
  userTable: '201px',
  dailyTable: '381px',
  contactTable: '296px',
  myContactTable: '296px',
  blacklistTable: '520px',
  exportTable: '250px'
};

export const OTHER_HEIGHT_SMALL_SCREEN: ITableHeight = {
  userTable: '201px',
  dailyTable: '381px',
  contactTable: '346px',
  myContactTable: '346px',
  blacklistTable: '520px',
  exportTable: '250px'
};

export const INITIAL_IS_BIG_SCREEN = window.innerWidth > 1493;

export const getOtherHeight = (isBigScreen?: boolean) =>
  window.innerWidth > 1493 || isBigScreen
    ? OTHER_HEIGHT
    : OTHER_HEIGHT_SMALL_SCREEN;

export const getFilteringFields = (filtersState: FiltersStateType) => {
  const withoutEmptyFields = deleteEmptyFields(filtersState);
  return Object.keys(withoutEmptyFields).reduce(
    (acc: { [key: string]: boolean }, cur: string) => {
      return withoutEmptyFields[cur] ? { ...acc, [cur]: true } : acc;
    },
    {}
  );
};
