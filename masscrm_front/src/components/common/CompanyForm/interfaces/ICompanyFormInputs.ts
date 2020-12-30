import { IIndustry, IContactsJobs } from 'src/interfaces';

export interface ICompanyFormInputs {
  [index: string]:
    | number
    | string
    | undefined
    | Array<string>
    | Array<IIndustry>
    | boolean
    | IContactsJobs
    | number[];
  id?: number;
  name: string;
  website?: string;
  linkedin?: string;
  sto_full_name?: string;
  type?: string;
  founded?: string;
  companySize?: string;
  min_employees?: number;
  max_employees?: number;
  comment?: string;
  industry?: any;
  subsidiary?: any;
  holding?: any;
  vacancies?: IContactsJobs;
}

export interface IErrorsContact {
  open: boolean;
  link?: string;
  simpleErr?: string[];
  duplicateErr?: string[];
}
