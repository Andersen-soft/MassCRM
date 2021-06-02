import {
  IEMail,
  ILocation,
  IPhone,
  ICompany,
  ISocialNetwork,
  ContactColleagues,
  ISequence,
  INote,
  ISale,
  IMinMax,
  ISaleSearch,
  ICompanySearch,
  ISort
} from 'src/interfaces';

export interface IContact {
  [key: string]: any;
  emails?: string[];
  first_name?: string;
  last_name?: string;
  full_name?: string;
  gender?: string;
  linkedin?: string;
  requires_validation?: number | string;
  location?: ILocation;
  social_networks?: string | string[];
  comment?: string;
  colleagues?: ContactColleagues;
  company_id?: number;
  company?: string;
  skype?: string;
  last_touch?: string;
  mailing_tool?: string;
  added_to_mailing?: string;
  responsible?: string;
  origin?: string[];
  birthday?: string;
  opens?: number;
  views?: number;
  deliveries?: number;
  replies?: number;
  bounces?: number;
  confidence?: number;
  service_id?: number;
  position?: string;
  sequences?: ISequence[];
  note?: string[];
  sales?: ISale[];
  phones?: string[];
}

export interface IContactResult {
  [key: string]: any;
  created_at?: string;
  updated_at?: string;
  company_id?: number;
  emails: IEMail[];
  first_name: string;
  last_name: string;
  full_name?: string;
  gender?: string;
  linkedin: string;
  requires_validation?: string;
  location: ILocation;
  social_networks?: ISocialNetwork[];
  comment?: string;
  colleague?: string[];
  company: ICompany;
  skype?: string;
  last_touch?: string;
  mailing_tool?: string;
  added_to_mailing?: string;
  responsible?: string;
  origin?: string[];
  birthday?: string;
  opens?: number;
  views?: number;
  deliveries?: number;
  replies?: number;
  bounces?: number;
  confidence?: number;
  service_id?: number;
  position?: string;
  sequences?: ISequence[];
  mails?: INote[];
  note?: INote[];
  sales?: ISale[];
  phones: IPhone[];
  in_blacklist?: boolean;
  is_in_work?: boolean;
  date_of_use?: string;
}
export interface IContactSearch {
  skip_responsibility?: number;
  responsible_id?: number[];
  created_at?: IMinMax;
  updated_at?: IMinMax;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  gender?: string[];
  birthday?: IMinMax;
  country?: string[];
  city?: string[];
  region?: string[];
  position?: string[];
  linkedin?: string;
  social_networks?: string;
  phone?: string;
  skype?: string;
  no_email?: string;
  email?: string;
  origin?: string[];
  requires_validation?: number;
  colleague_name?: string;
  colleague_link?: string;
  mailing_tool?: string[];
  service_id?: number;
  company_id?: string;
  added_to_mailing?: IMinMax;
  confidence?: IMinMax;
  last_touch?: IMinMax;
  sequence?: string;
  status?: string[];
  opens?: IMinMax;
  views?: IMinMax;
  deliveries?: IMinMax;
  replies?: IMinMax;
  bounces?: number[];
  mails?: string;
  my_notes?: string;
  in_blacklist?: number[];
  comment?: string;
  sale?: ISaleSearch;
  company?: ICompanySearch;
  is_in_work?: number[];
  date_of_use?: IMinMax;
  responsible_roles?: string[];
}

export interface IContactFilter {
  page?: number | string;
  limit?: number;
  search?: IContactSearch;
  sort?: ISort;
  mode?: string;
  listField?: string[];
}

export interface IContactSearchDownload {
  [key: string]:
    | string
    | string[]
    | IMinMax
    | IMinMax[]
    | number
    | number[]
    | undefined
    | { roles?: string[] | undefined };
  responsible?: string[] | { roles?: string[] | undefined };
  created?: IMinMax;
  updated?: IMinMax;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  gender?: string[];
  dateOfBirth?: IMinMax;
  country?: string[];
  city?: string[];
  region?: string[];
  location?: string[];
  position?: string[];
  linkedIn?: string;
  otherSocialNetworks?: string;
  phones?: string;
  skype?: string;
  emails?: string;
  origin?: string[];
  requiresValidation?: string[];
  colleagues?: string;
  colleaguesLink?: string;
  mailingTool?: string[];
  id?: number;
  addedToMailing?: IMinMax;
  confidence?: IMinMax;
  lastTouch?: IMinMax;
  sequence?: string;
  status?: string[];
  opens?: IMinMax;
  views?: IMinMax;
  deliveries?: IMinMax;
  replies?: IMinMax;
  bounces?: number | number[];
  mails?: string;
  myNotes?: string;
  saleCreated?: IMinMax;
  source?: string[];
  saleLink?: string;
  saleStatus?: string[];
  saleIs1cProject?: string[];
  company?: string[];
  website?: string;
  companyLinkedIn?: string;
  cto?: string;
  industries?: string[];
  companySize?: IMinMax[];
  typeOfCompany?: string[];
  subsidiaryCompanies?: string;
  holdingCompany?: string;
  founded?: IMinMax;
  jobs?: string[];
  jobsSkills?: string[];
  comments?: string;
  responsible_roles?: string[];
  has_jobs?: string;
  jobs_status?: string;
}

export interface IContactDownload {
  ids?: number[];
  typeFile?: string;
  listField?: string[];
  limit?: number;
  search?: IContactSearchDownload;
  sort: {
    fieldName?: string;
    typeSort?: string;
  };
  isInWork?: number;
}

export interface IGlobalContactSearch {
  query?: string;
  from?: string;
  to?: string;
}

export interface IContactFiltersState {
  [key: string]:
    | string[]
    | string
    | number
    | (Date | number)[]
    | IGlobalContactSearch;
  responsible: number[];
  contact_created: (Date | number)[];
  contact_updated: (Date | number)[];
  origin: string[];
  first_name: string;
  last_name: string;
  full_name: string;
  gender: string[];
  date_of_birth: (Date | number)[];
  country: string[];
  region: string[];
  city: string[];
  position: string[];
  linkedin: string;
  social_networks: string;
  phone: string;
  skype: string;
  email: string;
  requires_validation: string;
  confidence: number[];
  colleague: string;
  service_id: string;
  added_to_mailing: (Date | number)[];
  last_touch: (Date | number)[];
  sequence: string;
  status: string[];
  opens: number[];
  views: number[];
  deliveries: number[];
  replies: number[];
  bounces: string[];
  mails: string;
  my_notes: string;
  sale_created: (Date | number)[];
  source: string[];
  sale_id: number;
  sale_status: string[];
  project_c1: string;
  company: string[];
  company_website: string;
  company_industry: string[];
  company_size: string[];
  company_linkedin: string;
  cto: string;
  founded: (Date | number)[];
  company_created: (Date | number)[];
  company_subsidiary: string;
  company_holding: string;
  company_type: string[];
  jobs: string;
  jobs_skills: string;
  blacklist: string[];
  is_in_work: string[];
  date_of_use: (Date | number)[];
  comment: string;
  no_email: string;
  main_bounces: string[];
  responsible_roles: string[];
  has_jobs: string;
  vacancy_status: string;
  global: IGlobalContactSearch;
}

export interface IMultiFilterState {
  [index: string]: string[];
  responsible: string[];
  country: string[];
  region: string[];
  city: string[];
  position: string[];
  company: string[];
  company_size: string[];
  company_industry: string[];
  source: string[];
}

export interface IDefaultFilterValues {
  [index: string]: string | string[];
}

export interface IAutocomplete {
  [key: string]: string[];
  linkedin: string[];
  first_name: string[];
  last_name: string[];
  full_name: string[];
  gender: string[];
  position: string[];
  company: string[];
  company_size: string[];
  company_linkedin: string[];
  company_website: string[];
  email: string[];
  requires_validation: string[];
  city: string[];
  region: string[];
  country: string[];
  company_industry: string[];
  jobs: string[];
  jobs_skills: string[];
  comment: string[];
  cto: string[];
  company_type: string[];
  company_subsidiary: string[];
  company_holding: string[];
  origin: string[];
  service_id: string[];
  sequence: string[];
  sale_status: string[];
  bounces: string[];
  mails: string[];
  my_notes: string[];
  source: string[];
  sale_id: string[];
  status: string[];
  project_c1: string[];
  social_networks: string[];
  phone: string[];
  colleague: string[];
  skype: string[];
  responsible: string[];
  is_in_work: string[];
  blacklist: string[];
  no_email: string[];
}
export interface IGetActivityLogArgs {
  id?: number;
  page?: number;
  limit?: number;
  query?: string;
  from?: string;
  to?: string;
}

export interface ITableHeight {
  userTable: string;
  dailyTable: string;
  contactTable: string;
  myContactTable: string;
  blacklistTable: string;
  exportTable: string;
  reportTable: string;
}

export type FormatterType = (
  name: string,
  value?: string | boolean,
  isDate?: boolean
) => string | boolean | undefined;
