import { ICompanySearch, ISort } from 'src/interfaces';

export interface ICompanyFilter {
  page?: number;
  limit?: number;
  search?: ICompanySearch;
  sort?: ISort;
  mode?: string;
}
