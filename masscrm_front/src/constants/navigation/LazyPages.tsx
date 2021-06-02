import { lazy } from 'react';

export const Contact = lazy(() => import('src/view/pages/Contact/Contact'));
export const UsersCRM = lazy(() => import('src/view/pages/UsersCRM/UsersCRM'));
export const CompanyPage = lazy(() =>
  import('src/view/pages/CompanyPage/CompanyPage')
);
export const SetPassword = lazy(() =>
  import('src/view/pages/SetPassword/SetPassword')
);
export const Blacklist = lazy(() =>
  import('src/view/pages/Blacklist/Blacklist')
);
export const ContactPage = lazy(() =>
  import('src/view/pages/ContactPage/ContactPage')
);
export const StatusPage = lazy(() =>
  import('src/view/pages/StatusPage/StatusPage')
);
export const ErrorPage = lazy(() =>
  import('src/view/pages/ErrorPage/ErrorPage')
);
export const ReviewPage = lazy(() =>
  import('src/view/pages/ReviewPage/ReviewPage')
);
export const ReportPage = lazy(() =>
  import('src/view/pages/ReportPage/ReportPage')
);
