import { IIndustry } from './IIndustry';
import { IJob } from './IJob';
import { IContactsJobs } from './IContactJobInput';
import { IMinMax } from './IMinMax';
import { ISort } from './ISort';

export interface ICompany {
  [key: string]:
    | number
    | string
    | IIndustry
    | Array<IJob>
    | Array<{ id: number; name: string }>
    | undefined;
  id: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  website?: string;
  linkedin?: string;
  sto_full_name?: string;
  type?: string;
  founded?: string;
  min_employees?: number;
  max_employees?: number;
  comment?: string;
  industries?: Array<IIndustry>;
  subsidiary?: Array<{ id: number; name: string }>;
  holding?: Array<{ id: number; name: string }>;
  vacancies?: IContactsJobs;
}

export interface ICompanySearch {
  created_at?: IMinMax;
  updated_at?: IMinMax;
  name?: string[];
  website?: string;
  linkedin?: string;
  sto_full_name?: string;
  industry?: string[];
  company_size?: IMinMax;
  type?: Array<string>;
  subsidiary?: string;
  holding?: string;
  founded?: IMinMax;
  jobs?: Array<string>;
  skills?: Array<string>;
}

export interface ICompanyFilter {
  page?: number;
  limit?: number;
  search?: ICompanySearch;
  sort?: ISort;
  mode?: string;
}

export interface ICompanyUpdate {
  id?: number;
  name?: string;
  website?: string;
  linkedin?: string;
  sto_full_name?: string;
  type?: string;
  founded?: string;
  min_employees?: number | null;
  max_employees?: number | null;
  comment?: string;
  industries?: Array<number>;
  subsidiaries?: Array<number>;
  holding?: Array<number>;
  vacancies?: Array<IJob>;
  skip_validation?: number;
}

export interface ICompanySize {
  name: string;
  min: number;
  max: number;
}
