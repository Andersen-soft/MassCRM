import { ICompanySize } from './ICompany';

export interface IFilterData {
  company_size?: Array<ICompanySize>;
  origin?: Array<string>;
  company_type?: Array<string>;
}
