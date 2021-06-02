import {
  ALL_CONTACTS,
  BLACKLIST,
  REPORT_PAGE,
  REVIEW_PAGE,
  USERS_PATH,
  ADD_CONTACTS_PATH,
  ALL_CONTACTS_PATH,
  BLACKLIST_PATH,
  REVIEW_PAGE_PATH,
  REPORT_PAGE_PATH,
  MY_CONTACTS_PATH,
  ADD_CONTACTS,
  MY_CONTACTS,
  USER_PAGE
} from '.';

interface INavConfig {
  [key: string]: {
    navMenu: { title: string; url: string }[];
    defaultPage: string;
  };
}

export const NAVIGATION_CONFIG: INavConfig = {
  superAdmin: {
    navMenu: [
      { title: USER_PAGE, url: USERS_PATH },
      { title: ADD_CONTACTS, url: ADD_CONTACTS_PATH },
      { title: ALL_CONTACTS, url: ALL_CONTACTS_PATH },
      { title: BLACKLIST, url: BLACKLIST_PATH },
      { title: REVIEW_PAGE, url: REVIEW_PAGE_PATH }
    ],
    defaultPage: USERS_PATH
  },
  administrator: {
    navMenu: [{ title: USER_PAGE, url: USERS_PATH }],
    defaultPage: USERS_PATH
  },
  manager: {
    navMenu: [
      { title: ALL_CONTACTS, url: ALL_CONTACTS_PATH },
      { title: BLACKLIST, url: BLACKLIST_PATH },
      { title: REVIEW_PAGE, url: REVIEW_PAGE_PATH },
      { title: REPORT_PAGE, url: REPORT_PAGE_PATH }
    ],
    defaultPage: ALL_CONTACTS_PATH
  },
  nc1: {
    navMenu: [
      { title: ADD_CONTACTS, url: ADD_CONTACTS_PATH },
      { title: MY_CONTACTS, url: MY_CONTACTS_PATH },
      { title: REPORT_PAGE, url: REPORT_PAGE_PATH }
    ],
    defaultPage: ADD_CONTACTS_PATH
  },
  nc2: {
    navMenu: [
      { title: ADD_CONTACTS, url: ADD_CONTACTS_PATH },
      { title: MY_CONTACTS, url: MY_CONTACTS_PATH },
      { title: REPORT_PAGE, url: REPORT_PAGE_PATH }
    ],
    defaultPage: ADD_CONTACTS_PATH
  }
};
