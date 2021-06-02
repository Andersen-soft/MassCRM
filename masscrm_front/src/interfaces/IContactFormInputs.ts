import {
  ContactsJobs,
  ISale,
  ContactColleagues,
  ISequence
} from 'src/interfaces';

interface INotes {
  id: number;
  message: string;
}

type CompanyTypeOfIndustry = string | number;
export interface IContactFormInputs {
  [index: string]:
    | ContactColleagues
    | number
    | string
    | undefined
    | string[]
    | ISale[]
    | boolean
    | Date[]
    | ISequence[]
    | ContactsJobs
    | INotes[]
    | Date
    | number[];
  id?: number;
  responsible?: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  gender?: string;
  social_networks?: string[];
  social_network?: string;
  country?: string;
  region?: string;
  city?: string;
  position?: string;
  linkedin?: string;
  emails: string[];
  email?: string;
  validation: boolean;
  phones?: string[];
  phone?: string;
  colleagues?: ContactColleagues;
  company?: string;
  company_id: number;
  companyWebSite?: string;
  companySize?: string;
  companyLinkedIn?: string;
  industry?: string[];
  CTO?: string;
  comment?: string;
  vacancies?: ContactsJobs;
  confidence?: number;
  birthday?: string;
  skype?: string;
  origin?: string[];
  company_type?: string;
  company_subsidiary?: CompanyTypeOfIndustry;
  company_holding?: CompanyTypeOfIndustry;
  company_founded?: string;
  sequences?: ISequence[];
  notes?: INotes[];
  sales?: ISale[];
  autoFocus?: string;
  countryCode?: string;
  regionCode?: string;
  min_employees?: number;
  max_employees?: number;
  industries?: number[];
  skip_validation?: number;
}
