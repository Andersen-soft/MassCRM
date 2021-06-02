import { ICompany } from 'src/interfaces';

export interface ICompanyCell {
  id: number;
  contactID: number;
  value?: ICompany[];
  type?: string;
  href?: string;
  doubleClickEdit?: boolean;
}
