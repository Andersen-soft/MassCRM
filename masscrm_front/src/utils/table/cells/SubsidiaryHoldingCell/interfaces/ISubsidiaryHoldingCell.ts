import { ICompany } from 'src/interfaces';

export interface ISubsidiaryHoldingCell {
  id: number;
  contactID: number;
  value?: Array<ICompany>;
  type?: string;
}

export interface ISubsidiaryHoldingEdit {
  handleClose: () => void;
}
