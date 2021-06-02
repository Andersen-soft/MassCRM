import {
  ISearchItem,
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
  ImportStatus,
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
  IContact,
  ReportData,
  IBlacklistSearch,
  IReportSearch,
  IReportFilter,
  IReportSortingState
} from 'src/interfaces';

export type LocationStore = ILocations;

export interface INotificationStore {
  data: any[] | null;
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
  data: IBlacklistItem[];
  total?: number;
  per_page?: number;
  showCount: number;
  filterValues: any;
  filterSettings: IBlacklistSearch;
}

export interface IContactStore {
  data: IContactResult[];
  plan: {
    count: string;
    expected: string;
  };
  total?: number;
  per_page?: number;
  previous_companies?: IPreviousCompany[];
  attachments?: IAttachment[];
  activity_log?: IActivityLog;
  contactForBindingToCompany?: IContact;
  isContactForBindingToCompanyUpdated?: boolean;
  showCount: number;
}

export interface IUsersStore {
  ldapUser: IUser[];
  users: IUser[];
  userData: IUser;
  roles: IRoles;
  filteredUsers?: { [key: string]: string }[] | null;
  errorText?: string;
  total?: number;
  searchUsers?: IUser[];
  fullName?: string[];
}
export interface ICompanyStore {
  data: ICompany;
  attachments?: IAttachment[];
  activity_log?: IActivityLog;
}
export interface IIndustryStore {
  data: IIndustry[];
}

export interface IImportStore {
  columnSeparatorList: string[];
  fetching: IFetching;
  fieldsList: IFieldsList;
  fieldsSelectList: string[];
  fileInfo: IFileInfo;
  formState: IImportModalFormState;
  importStatus: ImportStatus;
  info: IInfo;
  isImportModalOpen: boolean;
  originList: string[];
  responsibleSearchList: ISearchItem[];
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
  selectedReportContacts: number[];
}

export interface IPageStore {
  currentPage: number;
}

export interface IErrorStore {
  data?: string;
}

export interface IReportStore {
  [key: string]: any;
  data: ReportData;
  total?: number;
  per_page?: number;
  showCount: number;
  filterValues: IReportSearch;
  filterSettings: IReportFilter;
  sortBy?: ISortingObject;
  sort?: IReportSortingState;
}

export interface IStoreState {
  users: IUsersStore;
  location: LocationStore;
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
