import { IEMail, ILocation, IPhone } from '.';
import { ICompany } from './ICompany';
import { ISocialNetwork } from './ISocialNetwork';
import { IContactColleagues } from './IContactColleague';
import {
  ISale,
  ISequence
} from '../components/Contact/components/ContactForm/interfaces';

export interface IContact {
  [key: string]: any;
  emails?: Array<string>;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  gender?: string;
  linkedin?: string;
  requires_validation?: string;
  location?: ILocation;
  social_networks?: Array<string>;
  comment?: string;
  colleagues?: IContactColleagues;
  company_id?: number;
  company?: string;
  skype?: string;
  last_touch?: string;
  mailing_tool?: string;
  added_to_mailing?: string;
  responsible?: string;
  origin?: string;
  birthday?: string;
  opens?: number;
  views?: number;
  deliveries?: number;
  replies?: number;
  bounces?: number;
  confidence?: number;
  service_id?: number;
  position?: string;
  sequences?: Array<{ id: number; sequence: string; status: string }>;
  notes?: Array<{ id: number; message: string }>;
  sales?: Array<ISale>;
  phones?: Array<string>;
}

export interface IContactResult {
  [key: string]: any;
  id: number;
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
  origin?: string;
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
  mails?: Array<{ id: number; message: string }>;
  notes?: Array<{ id: number; message: string }>;
  sales?: Array<ISale>;
  phones: Array<IPhone>;
}
export interface IContactFilter {
  page?: number | string;
  limit?: number;
  search?: {
    responsible?: Array<string>;
    created_at?: {
      min?: number | string;
      max?: number | string;
    };
    updated_at?: {
      min?: string | number;
      max?: string | number;
    };
    first_name?: string;
    last_name?: string;
    full_name?: string;
    gender?: Array<string>;
    birthday?: {
      min?: string | number;
      max?: string | number;
    };
    country?: Array<string>;
    city?: Array<string>;
    region?: Array<string>;
    position?: string;
    linkedin?: string;
    social_networks?: string;
    phone?: string;
    skype?: string;
    email?: string;
    origin?: Array<string>;
    requires_validation?: number;
    colleague_name?: string;
    colleague_link?: string;
    mailing_tool?: Array<string>;
    service_id?: number;
    company_id?: string;
    added_to_mailing?: {
      min?: string | number;
      max?: string | number;
    };
    confidence?: {
      min?: string | number;
      max?: string | number;
    };
    last_touch?: {
      min?: string | number;
      max?: string | number;
    };
    sequence?: string;
    status?: Array<string>;
    opens?: {
      min?: string | number;
      max?: string | number;
    };
    views?: {
      min?: string | number;
      max?: string | number;
    };
    deliveries?: {
      min?: string | number;
      max?: string | number;
    };
    replies?: {
      min?: string | number;
      max?: string | number;
    };
    bounces?: number;
    mails?: string;
    my_notes?: string;
    comment?: string;
    sale?: {
      id?: number;
      created_at?: {
        min?: string | number;
        max?: string | number;
      };
      source?: Array<string>;
      link?: string;
      status?: Array<string>;
      project_c1?: number;
    };
    company?: {
      created_at?: {
        min?: string | number;
        max?: string | number;
      };
      name?: Array<string>;
      website?: string;
      linkedin?: string;
      sto_full_name?: string;
      industry?: Array<string>;
      company_size?: {
        min?: string | number;
        max?: string | number;
      };
      type?: Array<string>;
      subsidiary?: string;
      holding?: string;
      founded?: {
        min?: string | number;
        max?: string | number;
      };
      jobs?: Array<string>;
      skills?: Array<string>;
    };
  };
  sort?: {
    field_name?: string;
    type_sort?: string;
  };
  mode?: string;
  listField?: Array<string>;
}

export interface IContactSearchDownload {
  [key: string]:
    | Array<string>
    | {
        min?: string | number;
        max?: string | number;
      }
    | string
    | number
    | undefined;
  responsible?: Array<string>;
  created?: {
    min?: string | number;
    max?: string | number;
  };
  updated?: {
    min?: string | number;
    max?: string | number;
  };
  firstName?: string;
  lastName?: string;
  fullName?: string;
  gender?: Array<string>;
  dateOfBirth?: {
    min?: string | number;
    max?: string | number;
  };
  country?: Array<string>;
  city?: Array<string>;
  region?: Array<string>;
  location?: Array<string>;
  position?: string;
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
  addedToMailing?: {
    min?: string | number;
    max?: string | number;
  };
  confidence?: {
    min?: string | number;
    max?: string | number;
  };
  lastTouch?: {
    min?: string | number;
    max?: string | number;
  };
  sequence?: string;
  status?: Array<string>;
  opens?: {
    min?: string | number;
    max?: string | number;
  };
  views?: {
    min?: string | number;
    max?: string | number;
  };
  deliveries?: {
    min?: string | number;
    max?: string | number;
  };
  replies?: {
    min?: string | number;
    max?: string | number;
  };
  bounces?: number;
  mails?: string;
  myNotes?: string;
  saleCreated?: {
    min?: string | number;
    max?: string | number;
  };
  source?: Array<string>;
  saleLink?: string;
  saleStatus?: Array<string>;
  saleIs1cProject?: Array<string>;
  company?: Array<string>;
  website?: string;
  companyLinkedIn?: string;
  cto?: string;
  industries?: Array<string>;
  companySize?: {
    min?: string | number;
    max?: string | number;
  };
  typeOfCompany?: Array<string>;
  subsidiaryCompanies?: string;
  holdingCompany?: string;
  founded?: {
    min?: string | number;
    max?: string | number;
  };
  jobs?: Array<string>;
  jobsSkills?: Array<string>;
  comments?: string;
}

export interface IContactDownload {
  typeFile?: string;
  listField?: Array<string>;
  limit?: number;
  search?: IContactSearchDownload;
  sort: {
    fieldName?: string;
    typeSort?: string;
  };
}

export interface IContactFiltersState {
  [key: string]: string[] | string | number | Array<Date | number>;
  Responsible: string[];
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
  Position: string;
  Li: string;
  'Social Networks': string;
  Phone: string;
  Skype: string;
  'E-mail': string;
  Validation: string;
  Confidence: string[];
  Collegue: string;
  ID: string;
  'Added to mailing': Array<Date | number>;
  'Last touch': Array<Date | number>;
  Sequence: string;
  Status: string[];
  Opens: string[];
  Views: string[];
  Deliveries: string[];
  Replies: string[];
  Bounces: string;
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
  Comment: string;
}
