import { combineReducers } from 'redux';
import { IStoreState } from 'src/interfaces';
import { userReducer } from './slices/user';
import { locationReducer } from './slices/location';
import { companyReducer } from './slices/company';
import { notificationReducer } from './slices/notification';
import { contactReducer } from './slices/contact';
import { industryReducer } from './slices/industry';
import { importReducer } from './slices/import';
import { filterReducer } from './slices/filter';
import { pageReducer } from './slices/page';
import { websocketReducer } from './slices/websocket';
import { loaderReducer } from './slices/loader';
import { blacklistReducer } from './slices/blacklist';
import { exportReducer } from './slices/export';
import { errorReducer } from './slices/error';
import { reportReducer } from './slices/report';
import { autocompleteReducer } from './slices/autocomplete';
import { importDataReducer } from './slices/importTable';

const rootReducer = combineReducers<IStoreState>({
  users: userReducer,
  location: locationReducer,
  notification: notificationReducer,
  contacts: contactReducer,
  companies: companyReducer,
  industry: industryReducer,
  import: importReducer,
  filter: filterReducer,
  page: pageReducer,
  websocket: websocketReducer,
  loader: loaderReducer,
  blacklist: blacklistReducer,
  exportData: exportReducer,
  errorData: errorReducer,
  importData: importDataReducer,
  autocomplete: autocompleteReducer,
  report: reportReducer
});

export default rootReducer;
