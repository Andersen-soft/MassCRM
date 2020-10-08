import { ICompany } from './ICompany';
import { IEMail } from './IEMail';
import { INote } from './INote';
import { IPhone } from './IPhone';
import { ISale } from '../components/Contact/components/ContactForm/interfaces';
import { ISocialNetwork } from './ISocialNetwork';
import { IUser } from './IUser';

export interface IOneContactData {
  [key: string]: any;
  added_to_mailing?: boolean | null;
  birthday: string;
  bounces?: number | null;
  colleagues: Array<string>;
  comment?: string;
  company: ICompany;
  company_id?: number;
  confidence?: number;
  created_at?: string;
  deliveries?: number | null;
  emails: Array<IEMail>;
  first_name: string;
  full_Name?: string;
  gender?: string;
  id?: number | null;
  in_blacklist?: boolean | null;
  last_name: string;
  last_touch?: string;
  linkedIn?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
  mailing_tool?: string;
  mails: Array<{ id: number; message: string }>;
  note: Array<INote>;
  opens?: {
    min?: string | number;
    max?: string | number;
  };
  origin: Array<string>;
  phones: Array<IPhone>;
  position?: string;
  replies?: number | null;
  responsible?: string;
  sales: Array<ISale>;
  sequences?: Array<{ id: number; sequence: string; status: string }>;
  service_id?: number | null;
  skype?: string;
  social_networks: Array<ISocialNetwork>;
  updated_at?: string;
  views?: null | string | number;
}

export interface IOneContactActivityLogItem {
  date: string;
  description: string;
  user: {
    id: number;
    name: string;
    surname: string;
  };
}

export interface IOneContactAttachmentItem {
  companyId?: number | null;
  createdAt: string;
  fileName: string;
  id: number | undefined;
  updatedAt?: string;
  url: string;
  user: IUser;
}
