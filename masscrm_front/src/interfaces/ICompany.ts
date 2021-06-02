import {
  IIndustry,
  IJob,
  Contacts,
  ContactsJobs,
  IMinMax
} from 'src/interfaces';

export type IndustriesCommonFormat = {
  id: number;
  name: string;
};

export interface ICompany {
  [key: string]:
    | number
    | string
    | IIndustry
    | IJob[]
    | { id: number; name: string }[]
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
  industries?: IIndustry[];
  subsidiary?: IndustriesCommonFormat[];
  holding?: IndustriesCommonFormat[];
  vacancies?: ContactsJobs;
  contacts?: Contacts;
}

export interface ICompanySearch {
  created_at?: IMinMax;
  updated_at?: IMinMax;
  name?: string[];
  website?: string;
  linkedin?: string;
  sto_full_name?: string;
  industry?: string[];
  company_size?: IMinMax[];
  type?: string[];
  subsidiary?: string;
  holding?: string;
  founded?: IMinMax;
  jobs?: string[];
  skills?: string[];
  has_jobs?: string;
  jobs_status?: string;
}

type NumberOfEmployees = number | null;

export interface ICompanyUpdate {
  id?: number;
  name?: string;
  website?: string;
  linkedin?: string;
  sto_full_name?: string;
  type?: string;
  founded?: string;
  min_employees?: NumberOfEmployees;
  max_employees?: NumberOfEmployees;
  comment?: string;
  industries?: number[];
  subsidiaries?: number[];
  holding?: number[];
  vacancies?: IJob[];
  skip_validation?: number;
}

export interface ICompanySize {
  name: string;
  min: number;
  max: number;
}
