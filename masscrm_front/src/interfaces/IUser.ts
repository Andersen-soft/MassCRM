import { IRoles } from './IRoles';

export interface IUser {
  active?: boolean;
  comment?: string;
  email?: string;
  fromActiveDirectory?: boolean;
  id?: number;
  login?: string;
  name?: string;
  position?: string;
  roles: IRoles;
  message?: string;
  skype?: string;
  surname?: string;
}

export interface IUserRort {
  fieldName: string;
  typeSort: string;
}

export interface ISearch {
  active?: number;
  email?: string;
  fullName?: string;
  login?: string;
  position?: string;
  roles?: string[];
  skype?: string;
}

export interface IFilter {
  page?: number;
  limit?: number;
  search?: ISearch;
  sort?: IUserRort;
}

export interface IUserFiltersValues {
  [index: string]: string | string[];
  'full name': string;
  'e-mail': string;
  login: string;
  roles: string[];
  skype: string;
  position: string;
  status: string;
}
export interface IUsersFiltersRequestValues {
  fullName?: string;
  email?: string;
  login?: string;
  roles?: string[];
  skype?: string;
  position?: string;
  active: number;
}
