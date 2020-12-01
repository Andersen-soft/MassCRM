import { ISearchItem } from 'src/components/common/SearchInput/interfaces';
import { IFileInfo } from './IFile';

export interface IImportModalFormState {
  columnSeparator: string;
  comment: string;
  duplicationAction: string;
  fields: Array<string>;
  isHeaders: boolean;
  origin: string[];
  responsible?: ISearchItem;
}

export interface IFetching {
  [key: string]: boolean;
}

export type IImportStatus = 'none' | 'processing' | 'success';

export interface IGetDisabledTabsProps {
  fileInfo: IFileInfo;
  importStatus: IImportStatus;
  errors: boolean;
}
export type IRow = string | number | null;

export interface IDocInfo {
  headers: Array<string>;
  rows: Array<Array<IRow>>;
}

export interface IFieldsList {
  [key: string]: string;
}

export type ISetFieldItem = string | number | boolean | string[] | ISearchItem;

export interface IImportedData {
  fields: string[];
  responsible: number | null;
  column_separator: string;
  is_headers: number;
  duplication_action: string;
  origin?: string[];
  comment?: string;
}

// TODO: correct it when such functional will be on backend
export interface IInfo {
  countNewContacts: number;
  countNewCompanies: number;
  countProcessedDuplicateContacts: number;
  countProcessedDuplicateCompanies: number;
  countMissedDuplicates?: number;
  fileNameMissedDuplicates: string;
  countUnsuccessfully?: number;
  fileNameUnsuccessfullyDuplicates: string;
}
