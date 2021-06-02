import { IUser } from 'src/interfaces';

export interface IBlacklistItem {
  created_at: Date;
  domain: string;
  id: number;
  source: string;
  updated_at: Date;
  user: IUser;
}
export interface IBlacklistFiltersState {
  [index: string]: string | Date[];
  blacklist: string;
  user: string;
  date: Date[];
}

export interface IBlacklistSearch {
  limit?: number;
  page?: number;
  search?: {
    domain?: string;
    user?: string;
    date?: {
      min?: string;
      max?: string;
    };
  };
  sort?: {
    field_name?: string;
    type_sort?: string;
  };
}
