import { IRoles } from 'src/interfaces';

export interface IUser {
  [key: string]: string | boolean | number | undefined | IRoles;
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
  fullName: string;
  email: string;
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

export interface IUserFormInputs {
  [index: string]: string | string[] | undefined | boolean;
  email?: string;
  login?: string;
  name?: string;
  surname?: string;
  roles?: string[];
  skype?: string;
  position?: string;
  comment?: string;
  active?: boolean;
  fromActiveDirectory?: boolean;
}

export interface ICreateAddUser {
  user: IUserFormInputs;
  currentPage: number;
  filter: IUsersFiltersRequestValues;
  handleAlert?: () => void;
  handleClose?: () => void;
}

export interface IUpdateAddUser {
  id: number;
  user: IUserFormInputs;
  currentPage: number;
  filter: IUsersFiltersRequestValues;
  handleAlert?: () => void;
  handleClose?: () => void;
}
