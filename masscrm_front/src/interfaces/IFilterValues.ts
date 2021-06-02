export interface IFilterValuesUsers {
  [key: string]: any;
  fullName: string;
  email: string;
  login: string;
  roles: string[];
  skype: string;
  position: string;
  status: string;
}

export interface IFilterValue {
  code: string;
  item: string | string[] | null | Date[];
}
