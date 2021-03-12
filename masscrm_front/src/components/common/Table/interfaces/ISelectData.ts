import { ITableRow } from './ITableRow';

export interface ISelectData {
  isCheckedAll: boolean;
  onSelectAll: Function;
  data?: ITableRow[];
  currentPageStringified: string;
  setSelectedContacts?: Function;
  param: URLSearchParams;
  checkedContacts: string | null;
  selectAllOnPage: string | null;
  checkedContactsArray?: number[];
  contactsIDs: number[];
}
