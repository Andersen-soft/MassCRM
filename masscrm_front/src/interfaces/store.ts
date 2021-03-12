import { ISearchItem } from 'src/components/common/SearchInput/interfaces';
import {
  ILocations,
  IUser,
  IContactFilter,
  IContactFiltersState,
  IContactResult,
  IMultiFilterState,
  ICompany,
  IIndustry,
  IFilterData,
  IRoles,
  IImportModalFormState,
  IFetching,
  IDocInfo,
  IFieldsList,
  IImportStatus,
  IInfo,
  IFileInfo,
  IWebsocketStore,
  ISortingObject,
  ISortingState,
  IBlacklistItem,
  IExportStore,
  IPreviousCompany,
  IAttachment,
  IActivityLog,
  IImportDataStore,
  IFilter,
  IFilterValuesUsers,
  IContact
} from '.';
import { IBlacklistSearch } from './IBlacklist';
import {
  IReportTableMapForManager,
  IReportTableMapForNC1,
  IReportTableMapForNC2
} from './IReport';

export type ILocationStore = ILocations;

export interface INotificationStore {
  data: Array<any> | null;
  notification: any;
}

export interface ILoaderStore {
  isLoading: boolean;
}

export interface IAutocompleteStore {
  isPending: boolean;
}

export interface IBlacklistStore {
  isFiltersUse: boolean;
  data: Array<IBlacklistItem>;
  total?: number;
  per_page?: number;
  showCount: number;
  filterValues: any;
  filterSettings: IBlacklistSearch;
}

export interface IContactStore {
  data: Array<IContactResult>;
  plan: {
    count: string;
    expected: string;
  };
  total?: number;
  per_page?: number;
  previous_companies?: Array<IPreviousCompany>;
  attachments?: Array<IAttachment>;
  activity_log?: IActivityLog;
  contactForBindingToCompany?: IContact;
  isContactForBindingToCompanyUpdated?: boolean;
  showCount: number;
}

export interface IUsersStore {
  ldapUser: Array<IUser>;
  users: IUser[];
  userData: IUser;
  roles: IRoles;
  filteredUsers?: Array<{ [key: string]: string }> | null;
  errorText?: string;
  total?: number;
  searchUsers?: Array<IUser>;
  fullName?: string[];
}
export interface ICompanyStore {
  data: ICompany;
  attachments?: Array<IAttachment>;
  activity_log?: IActivityLog;
}
export interface IIndustryStore {
  data: Array<IIndustry>;
}

export interface IImportStore {
  columnSeparatorList: Array<string>;
  fetching: IFetching;
  fieldsList: IFieldsList;
  fieldsSelectList: Array<string>;
  fileInfo: IFileInfo;
  formState: IImportModalFormState;
  importStatus: IImportStatus;
  info: IInfo;
  isImportModalOpen: boolean;
  originList: Array<string>;
  responsibleSearchList: Array<ISearchItem>;
  showStartImportMessage: boolean;
  docInfo?: IDocInfo;
  selectedTab: string | number;
}

export interface IFilterStore {
  [key: string]: any;
  data?: IFilterData;
  settings?: IContactFilter;
  usersSettings: IFilter;
  values?: IContactFiltersState;
  multiValues?: IMultiFilterState;
  usersValues?: IFilterValuesUsers;
  sort?: ISortingState;
  sortBy?: ISortingObject;
  selectedAllContacts: number[];
  selectedBlacklistContacts: number[];
  selectedAddContacts: number[];
  selectedMyContacts: number[];
}

export interface IPageStore {
  currentPage: number;
}

export interface IErrorStore {
  data?: string;
}
export interface IReportStore {
  data: (
    | IReportTableMapForNC1
    | IReportTableMapForNC2
    | IReportTableMapForManager
  )[];
  total?: number;
  per_page?: number;
  showCount: number;
  filterValues: any;
  // TODO ts
  filterSettings: any;
  isFiltersUse: boolean;
}

export interface IStoreState {
  users: IUsersStore;
  location: ILocationStore;
  notification: INotificationStore;
  contacts: IContactStore;
  companies: ICompanyStore;
  industry: IIndustryStore;
  import: IImportStore;
  filter: IFilterStore;
  page: IPageStore;
  websocket: IWebsocketStore;
  loader: ILoaderStore;
  blacklist: IBlacklistStore;
  exportData: IExportStore;
  errorData: IErrorStore;
  importData: IImportDataStore;
  autocomplete: IAutocompleteStore;
  report: IReportStore;
}
