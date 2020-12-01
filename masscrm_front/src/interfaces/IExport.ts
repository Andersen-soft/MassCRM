import { IUser } from './IUser';

export interface IExport {
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

export interface IExportMetaData {
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

export interface IExportInputFilterValues {
  [index: string]: string | Date[];
  user: string;
  name: string;
  status: string;
  date: Date[];
}

export interface IExportStore {
  data: Array<IExport>;
  errors: Array<string>;
  meta: IExportMetaData;
  success: boolean;
  filter: IExportInputFilterValues;
}

export interface IExportSearch {
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

export interface IExportDataTable {
  total: number;
  show: number;
  data: Array<IExport>;
  filter: IExportInputFilterValues;
}
