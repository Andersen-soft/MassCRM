import {
  IContactsJobs,
  ISale,
  IContactColleagues,
  ISequence
} from 'src/interfaces';

export interface INotes {
  id: number;
  message: string;
}

export interface IContactFormInputs {
  [index: string]:
    | IContactColleagues
    | number
    | string
    | undefined
    | Array<string>
    | Array<ISale>
    | boolean
    | Array<Date>
    | Array<ISequence>
    | IContactsJobs
    | Array<INotes>
    | Date
    | number[];
  id?: number;
  responsible?: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  gender?: string;
  social_networks?: Array<string>;
  social_network?: string;
  country?: string;
  region?: string;
  city?: string;
  position?: string;
  linkedin?: string;
  emails: Array<string>;
  email?: string;
  validation: boolean;
  phones?: Array<string>;
  phone?: string;
  colleagues?: IContactColleagues;
  company?: string;
  company_id: number;
  companyWebSite?: string;
  companySize?: string;
  companyLinkedIn?: string;
  industry?: Array<string>;
  CTO?: string;
  comment?: string;
  vacancies?: IContactsJobs;
  confidence?: number;
  birthday?: string;
  skype?: string;
  origin?: Array<string>;
  company_type?: string;
  company_subsidiary?: string | number;
  company_holding?: string | number;
  company_founded?: string;
  sequences?: Array<ISequence>;
  notes?: Array<INotes>;
  sales?: Array<ISale>;
  autoFocus?: string;
  countryCode?: string;
  regionCode?: string;
  min_employees?: number;
  max_employees?: number;
  industries?: number[];
  skip_validation?: number;
}

export interface IErrorLink {
  link: string;
  name: string;
  created: string;
  responsible: string;
  type: 'linkedin' | 'social_network';
}

export interface IErrorsContact {
  open: boolean;
  link?: string;
  simpleErr?: string[];
  duplicateErr?: string[];
}

export interface IErrorsItem {
  created_at: string;
  link: string;
  name: string;
  responsible: string;
  title: string;
}
