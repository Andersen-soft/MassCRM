import { ComponentType, LazyExoticComponent } from 'react';
import {
  ADMIN,
  SUPER_ADMIN,
  NC1,
  NC2,
  MANAGER,
  USERS_PATH,
  ADD_CONTACTS_PATH,
  ALL_CONTACTS_PATH,
  BLACKLIST_PATH,
  REVIEW_PAGE_PATH,
  REPORT_PAGE_PATH,
  MY_CONTACTS_PATH,
  CONTACT_PAGE_PATH,
  EXPORT_PATH,
  IMPORT_PATH,
  Blacklist,
  Contact,
  ContactPage,
  ReportPage,
  ReviewPage,
  StatusPage,
  UsersCRM
} from '../../constants';

interface IRoute {
  key: number;
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
  exact: boolean;
  availableFor: string[];
  additionalProps: {
    myContactPage?: boolean;
    addContactsPage?: boolean;
    blacklistPage?: boolean;
    isImport?: boolean;
    reportPage?: boolean;
  };
}

export const ROUTES_CONFIG: IRoute[] = [
  {
    key: 1,
    path: USERS_PATH,
    component: UsersCRM,
    exact: true,
    availableFor: [SUPER_ADMIN, ADMIN],
    additionalProps: {}
  },
  {
    key: 2,
    path: ADD_CONTACTS_PATH,
    component: Contact,
    exact: true,
    availableFor: [SUPER_ADMIN, NC1, NC2],
    additionalProps: { addContactsPage: true }
  },
  {
    key: 3,
    path: MY_CONTACTS_PATH,
    component: Contact,
    exact: true,
    availableFor: [NC1, NC2],
    additionalProps: { myContactPage: true }
  },
  {
    key: 4,
    path: ALL_CONTACTS_PATH,
    component: Contact,
    exact: true,
    availableFor: [SUPER_ADMIN, MANAGER],
    additionalProps: {}
  },
  {
    key: 5,
    path: BLACKLIST_PATH,
    component: Blacklist,
    exact: true,
    availableFor: [SUPER_ADMIN, MANAGER],
    additionalProps: { blacklistPage: true }
  },
  {
    key: 6,
    path: CONTACT_PAGE_PATH,
    component: ContactPage,
    exact: true,
    availableFor: [SUPER_ADMIN, MANAGER, NC1, NC2],
    additionalProps: {}
  },
  {
    key: 7,
    path: EXPORT_PATH,
    component: StatusPage,
    exact: true,
    availableFor: [SUPER_ADMIN, MANAGER],
    additionalProps: {}
  },
  {
    key: 8,
    path: IMPORT_PATH,
    component: StatusPage,
    exact: true,
    availableFor: [SUPER_ADMIN, MANAGER, NC1, NC2],
    additionalProps: { isImport: true }
  },
  {
    key: 9,
    path: REVIEW_PAGE_PATH,
    component: ReviewPage,
    exact: true,
    availableFor: [SUPER_ADMIN, MANAGER],
    additionalProps: {}
  },
  {
    key: 10,
    path: REPORT_PAGE_PATH,
    component: ReportPage,
    exact: true,
    availableFor: [SUPER_ADMIN, MANAGER, NC1, NC2],
    additionalProps: { reportPage: true }
  }
];
