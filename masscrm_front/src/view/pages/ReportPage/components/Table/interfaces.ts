export interface IReportMapRequest {
  [index: string]: (value: string, limit?: number) => void;
  employee: (value: string, limit?: number) => void;
  role: (value: string, limit?: number) => void;
}

export interface IAutocompleteReport {
  [key: string]: string[];
  employee: string[];
  role: string[];
}

export interface IReportSortingFieldId {
  [key: string]: string | undefined;
  created?: string;
  updated?: string;
  total?: string;
}

interface IReportTableMapForNC2WithoutDate {
  [key: string]: number;
  created: number;
  updated: number;
  total: number;
  inReview: number;
  waiting: number;
  declined: number;
  totalErrors: number;
}

interface IReportTableMapForNC1WithoutDate {
  [key: string]: number;
  created: number;
  inReview: number;
  waiting: number;
  declined: number;
  totalErrors: number;
}

export type ReportTableMapWithoutDate =
  | IReportTableMapForNC1WithoutDate
  | IReportTableMapForNC2WithoutDate;
