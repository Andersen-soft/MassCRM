import { IContactResult } from 'src/interfaces';

export interface IContactJobValues {
  [index: string]: string | number | undefined;
  id?: number;
  job: string;
  skills: string;
  link: string;
  job_country?: string;
  job_region?: string;
  job_city?: string;
  updated_at?: string;
}

export type ContactsJobs = IContactJobValues[];

export type Contacts = IContactResult[];
