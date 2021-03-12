import { combineReducers } from 'redux';
import { IStoreState } from '../interfaces';
import { usersReducer } from './users.reducer';
import { locationReducer } from './location.reducer';
import { notificationReducer } from './notification.reducer';
import { contactReducer } from './contact.reducer';
import { companyReducer } from './company.reducers';
import { industryReducer } from './industry.reducer';
import { importReducer } from './import.reducer';
import { filterReducer } from './filter.reducer';
import { pageReducer } from './page.reducer';
import { websocketReducer } from './websocket.reducer';
import { loaderReducer } from './loader.reducer';
import { blacklistReducer } from './blacklist.reducer';
import { exportReducer } from './export.reducer';
import { errorReducer } from './error.reducer';
import { importDataReducer } from './import.table.reducer';
import { autocompleteReducer } from './autocomplete.reducer';
import { reportReducer } from './report.reducer';

const rootReducer = combineReducers<IStoreState>({
  users: usersReducer,
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
