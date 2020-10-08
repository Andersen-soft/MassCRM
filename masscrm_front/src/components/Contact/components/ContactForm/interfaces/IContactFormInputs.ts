import { IContactsJobs } from 'src/interfaces/IContactJobInput';
import { IContactColleagues } from 'src/interfaces/IContactColleague';

export interface INotes {
  id: number;
  message: string;
}

export interface ISequence {
  id: number;
  sequence: string;
  status: string;
}

export interface ISale {
  id: number;
  status: string;
  created_at: string;
  link: string;
  project_c1: string;
  source: string;
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
    | Date;
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
}

export interface IErrorLinkedin {
  name: string;
  created: string;
  responsible: string;
}

export interface IErrorsContact {
  open: boolean;
  linkedin?: IErrorLinkedin;
  simpleErr?: string;
}
