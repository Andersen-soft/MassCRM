import { IIndustry } from './IIndustry';
import { IJob } from './IJob';
import { IContactsJobs } from './IContactJobInput';

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

export interface ICompanyFilter {
  page?: number;
  limit?: number;
  search?: {
    name?: Array<string>;
    created_at?: {
      min?: string;
      max?: string;
    };
    updated_at?: {
      min?: string;
      max?: string;
    };
    website?: string;
    linkedin?: string;
    sto_full_name?: string;
    founded?: {
      min?: string;
      max?: string;
    };
    industry?: Array<string>;
    company_size?: {
      min: string;
      max: string;
    };
    type?: Array<string>;
    jobs?: Array<string>;
    skills?: Array<string>;
  };
  sort?: {
    sort?: {
      field_name?: string;
      type_sort?: string;
    };
  };
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
}

export interface ICompanySize {
  name: string;
  min: number;
  max: number;
}
