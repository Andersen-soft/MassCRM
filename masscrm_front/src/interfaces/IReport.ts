import { ISortingObject, IDatesPeriod } from 'src/interfaces';

export interface IReportTableMapForManager {
  id: number;
  name: string;
  surname: string;
  role: string[];
  created: number;
  updated: number;
  total: number;
  inReview: number;
  waiting: number;
  declined: number;
  totalErrors: number;
}

export interface IReportTableMapForNC1 {
  date: string;
  created: number;
  inReview: number;
  waiting: number;
  declined: number;
  totalErrors: number;
  period?: IDatesPeriod;
}

export interface IReportTableMapForNC2 {
  date: string;
  created: number;
  updated: number;
  total: number;
  inReview: number;
  waiting: number;
  declined: number;
  totalErrors: number;
  period?: IDatesPeriod;
}

type ReportItemNC = IReportTableMapForNC1 | IReportTableMapForNC2;

export type ReportNCData = ReportItemNC[];

export type ReportItem =
  | IReportTableMapForManager
  | IReportTableMapForNC1
  | IReportTableMapForNC2;

export type ReportData = ReportItem[];
export interface IReportSearch {
  role?: string[];
  employee?: string;
  date?: { from?: string; to?: string };
}

export interface IReportFilter {
  page?: number;
  limit?: number;
  search?: IReportSearch;
  sort?: ISortingObject;
}

export interface IReportSortingState {
  [key: string]: ISortingObject;
  created: ISortingObject;
  updated: ISortingObject;
  total: ISortingObject;
}
