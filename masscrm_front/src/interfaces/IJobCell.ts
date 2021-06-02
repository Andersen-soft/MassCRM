import { ContactsJobs } from 'src/interfaces';

export interface IJobCell {
  fieldName: string;
  value?: ContactsJobs;
  idContact: number;
  companyId: number;
  doubleClickEdit?: boolean;
}
