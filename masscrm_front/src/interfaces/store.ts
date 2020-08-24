import { ISearchItem } from 'src/components/common/SearchInput/interfaces';
import { ILocations } from './ILocation';
import { IUser } from './IUser';
import {
  IContactFilter,
  IContactFiltersState,
  IContactResult
} from './IContact';
import { ICompany } from './ICompany';
import { IIndustry } from './IIndustry';
import { IFilterData } from './IFilterData';
import { IRoles } from './IRoles';
import {
  IImportModalFormState,
  IFetching,
  IDocInfo,
  IFieldsList,
  IImportStatus,
  IInfo
} from './IImportModal';
import { IFileInfo } from './IFile';
import { IWebsocketStore } from './IWebsocket';
import { ISortingObject, ISortingState } from './ISorting';

export type ILocationStore = ILocations;

export interface INotificationStore {
  notification: string;
}

export interface ILoaderStore {
  isLoading: boolean;
}

export interface IContactStore {
  data: Array<IContactResult>;
  plan: {
    count: string;
    expected: string;
  };
  total?: number;
  per_page?: number;
}

export interface IUsersStore {
  ldapUser: Array<IUser>;
  users: { [key: string]: Array<IUser> };
  userData: IUser;
  roles: IRoles;
  filteredUsers?: Array<{ [key: string]: string }> | null;
  errorText?: string;
  total?: number;
}

export interface ICompanyStore {
  data: Array<ICompany>;
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
  selectedTab?: string;
}

export interface IFilterStore {
  data?: IFilterData;
  settings?: IContactFilter;
  values?: IContactFiltersState;
  sort?: ISortingState;
  sortBy?: ISortingObject;
}

export interface IPageStore {
  currentPage: number;
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
}
