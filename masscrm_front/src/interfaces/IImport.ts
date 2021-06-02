import { IUser } from 'src/interfaces';

export interface IImportModal {
  created_at?: string;
  file_path?: string;
  id: number;
  name?: string;
  status?: string;
  type?: string;
  updated_at?: string;
  user: IUser;
  operation_id?: number;
}

interface IImportMetaDataTable {
  current_page?: number;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string;
  path?: string;
  per_page: number;
  prev_page_url?: string;
  to?: number;
  total: number;
}

export interface IImportInputFilterValues {
  [index: string]: string | Date[];
  user: string;
  name: string;
  status: string;
  date: Date[];
}

export interface IImportDataStore {
  data: IImportModal[];
  errors: string[];
  meta: IImportMetaDataTable;
  success: boolean;
  filter?: IImportInputFilterValues;
}

export interface IImportSearch {
  limit?: number;
  page?: number;
  search?: {
    user?: string;
    status?: string;
    name?: string;
    date?: {
      min?: string;
      max?: string;
    };
  };
}

export interface IImportDataTable {
  total: number;
  show: number;
  data: IImportModal[];
  filter: IImportInputFilterValues;
}
