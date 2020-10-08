import { IContactsJobs } from 'src/interfaces/IContactJobInput';

export interface IJobCell {
  fieldName: string;
  value?: IContactsJobs;
  idContact: number;
  companyId: number;
}

export interface INotesEdit {
  handleClose: () => void;
}
