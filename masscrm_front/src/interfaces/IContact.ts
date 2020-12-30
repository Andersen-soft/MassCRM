import {
  IEMail,
  ILocation,
  IPhone,
  ICompany,
  ISocialNetwork,
  IContactColleagues,
  ISequence,
  INote,
  ISale,
  IMinMax,
  ISaleSearch,
  ICompanySearch,
  ISort
} from '.';

export interface IContact {
  [key: string]: any;
  emails?: Array<string>;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  gender?: string;
  linkedin?: string;
  requires_validation?: number | string;
  location?: ILocation;
  social_networks?: string | string[];
  comment?: string;
  colleagues?: IContactColleagues;
  company_id?: number;
  company?: string;
  skype?: string;
  last_touch?: string;
  mailing_tool?: string;
  added_to_mailing?: string;
  responsible?: string;
  origin?: Array<string>;
  birthday?: string;
  opens?: number;
  views?: number;
  deliveries?: number;
  replies?: number;
  bounces?: number;
  confidence?: number;
  service_id?: number;
  position?: string;
  sequences?: Array<ISequence>;
  note?: Array<string>;
  sales?: Array<ISale>;
  phones?: Array<string>;
}

export interface IContactResult {
  [key: string]: any;
  created_at?: string;
  updated_at?: string;
  company_id?: number;
  emails: Array<IEMail>;
  first_name: string;
  last_name: string;
  full_name?: string;
  gender?: string;
  linkedin: string;
  requires_validation?: string;
  location: ILocation;
  social_networks?: Array<ISocialNetwork>;
  comment?: string;
  colleague?: Array<string>;
  company: ICompany;
  skype?: string;
  last_touch?: string;
  mailing_tool?: string;
  added_to_mailing?: string;
  responsible?: string;
  origin?: Array<string>;
  birthday?: string;
  opens?: number;
  views?: number;
  deliveries?: number;
  replies?: number;
  bounces?: number;
  confidence?: number;
  service_id?: number;
  position?: string;
  sequences?: Array<ISequence>;
  mails?: Array<INote>;
  note?: Array<INote>;
  sales?: Array<ISale>;
  phones: Array<IPhone>;
  in_blacklist?: boolean;
  is_in_work?: boolean;
  date_of_use?: string;
}
export interface IContactSearch {
  skip_responsibility?: number;
  responsible_id?: number[] | undefined;
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
}

export interface IContactFilter {
  page?: number | string;
  limit?: number;
  search?: IContactSearch;
  sort?: ISort;
  mode?: string;
  listField?: Array<string>;
}

export interface IContactSearchDownload {
  [key: string]:
    | Array<string>
    | IMinMax
    | string
    | number
    | number[]
    | undefined;
  responsible?: Array<string>;
  created?: IMinMax;
  updated?: IMinMax;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  gender?: Array<string>;
  dateOfBirth?: IMinMax;
  country?: Array<string>;
  city?: Array<string>;
  region?: Array<string>;
  location?: Array<string>;
  position?: string[];
  linkedIn?: string;
  otherSocialNetworks?: string;
  phones?: string;
  skype?: string;
  emails?: string;
  origin?: Array<string>;
  requiresValidation?: Array<string>;
  colleagues?: string;
  colleaguesLink?: string;
  mailingTool?: Array<string>;
  id?: number;
  addedToMailing?: IMinMax;
  confidence?: IMinMax;
  lastTouch?: IMinMax;
  sequence?: string;
  status?: Array<string>;
  opens?: IMinMax;
  views?: IMinMax;
  deliveries?: IMinMax;
  replies?: IMinMax;
  bounces?: number | number[];
  mails?: string;
  myNotes?: string;
  saleCreated?: IMinMax;
  source?: Array<string>;
  saleLink?: string;
  saleStatus?: Array<string>;
  saleIs1cProject?: Array<string>;
  company?: Array<string>;
  website?: string;
  companyLinkedIn?: string;
  cto?: string;
  industries?: Array<string>;
  companySize?: IMinMax;
  typeOfCompany?: Array<string>;
  subsidiaryCompanies?: string;
  holdingCompany?: string;
  founded?: IMinMax;
  jobs?: Array<string>;
  jobsSkills?: Array<string>;
  comments?: string;
}

export interface IContactDownload {
  ids?: number[];
  typeFile?: string;
  listField?: Array<string>;
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
    | Array<Date | number>
    | IGlobalContactSearch;
  Responsible: number[];
  'Contact created': Array<Date | number>;
  'Contact updated': Array<Date | number>;
  Origin: string[];
  'First name': string;
  'Last name': string;
  'Full name': string;
  Gender: string[];
  'Date of birth': Array<Date | number>;
  Country: string[];
  Region: string[];
  City: string[];
  Title: string[];
  Li: string;
  'Social Networks': string;
  Phone: string;
  Skype: string;
  Email: string;
  Validation: string;
  Confidence: number[];
  Collegue: string;
  ID: string;
  'Added to mailing': Array<Date | number>;
  'Last touch': Array<Date | number>;
  Sequence: string;
  Status: string[];
  Opens: number[];
  Views: number[];
  Deliveries: number[];
  Replies: number[];
  Bounces: string[];
  Mails: string;
  'My notes': string;
  'Sale created': Array<Date | number>;
  Source: string[];
  'Sale ID': number;
  'Sale status': string[];
  '1C Project': string;
  Company: string[];
  'Company website': string;
  Industry: string[];
  'Company size': string;
  'Company LinkedIn': string;
  CTO: string;
  Founded: Array<Date | number>;
  'Company created': Array<Date | number>;
  'Subsidiary companies': string;
  'Holding company': string;
  'Type of company': string[];
  Job: string;
  'Job Skills': string;
  blacklist: string[];
  'In work': string[];
  'Date of use': Array<Date | number>;
  Comment: string;
  noEmail: string;
  mainBounces: string[];
  global: IGlobalContactSearch;
}

export interface IMultiFilterState {
  [index: string]: string[];
  Responsible: string[];
  Country: string[];
  Region: string[];
  City: string[];
  Title: string[];
  Company: string[];
  Industry: string[];
  Source: string[];
}

export interface IAutocomlete {
  [key: string]: string[];
  Li: string[];
  'First name': string[];
  'Last name': string[];
  'Full name': string[];
  Gender: string[];
  Title: string[];
  Company: string[];
  'Company size': string[];
  'Company LinkedIn': string[];
  'Company website': string[];
  Email: string[];
  Validation: string[];
  City: string[];
  Region: string[];
  Country: string[];
  Industry: string[];
  Job: string[];
  'Job Skills': string[];
  Comment: string[];
  CTO: string[];
  'Type of company': string[];
  'Subsidiary companies': string[];
  'Holding company': string[];
  Origin: string[];
  ID: string[];
  Sequence: string[];
  'Sale status': string[];
  Bounces: string[];
  Mails: string[];
  'My notes': string[];
  Source: string[];
  'Sale ID': string[];
  Status: string[];
  '1C Project': string[];
  'Social Networks': string[];
  Phone: string[];
  Colleague: string[];
  Skype: string[];
  Responsible: string[];
  'In work': string[];
  blacklist: string[];
  noEmail: string[];
}
