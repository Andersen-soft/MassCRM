import { ISearchItem, IFileInfo } from 'src/interfaces';

export interface IImportModalFormState {
  columnSeparator: string;
  comment: string;
  duplicationAction: string;
  fields: string[];
  isHeaders: boolean;
  origin: string[];
  responsible?: ISearchItem;
  fileName: string;
}

export interface IFetching {
  [key: string]: boolean;
}

export type ImportStatus = 'none' | 'processing' | 'success';

export interface IGetDisabledTabsProps {
  fileInfo: IFileInfo;
  importStatus: ImportStatus;
  errors: boolean;
}

type Row = string | number | null;

export interface IDocInfo {
  headers: string[];
  rows: Row[][];
}

export interface IFieldsList {
  [key: string]: string;
}

export type SetFieldItem = string | number | boolean | string[] | ISearchItem;

export interface IImportedData {
  fields: string[];
  responsible: number | null;
  column_separator: string;
  is_headers: number;
  duplication_action: string;
  origin?: string[];
  comment?: string;
  file_name: string;
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
