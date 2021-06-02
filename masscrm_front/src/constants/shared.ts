const isDevelopment =
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === undefined ||
  false;

export const applicationPath = isDevelopment ? '' : '../';

export const backendUrl = process.env.REACT_APP_MASS_CRM_BASE_URL;
