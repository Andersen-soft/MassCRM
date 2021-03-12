export interface IReportTableMapForManager {
  id: number;
  employee: string;
  role: string;
  created: string;
  updated: string;
  total: number;
  duplicates: number;
  inReview: number;
  waiting: number;
  declined: number;
  totalErrors: number;
}

export interface IReportTableMapForNC1 {
  id: number;
  date: string;
  created: string;
  duplicates: number;
  inReview: number;
  waiting: number;
  declined: number;
  totalErrors: number;
}

export interface IReportTableMapForNC2 {
  id: number;
  date: string;
  created: string;
  updated: string;
  total: number;
  duplicates: number;
  inReview: number;
  waiting: number;
  declined: number;
  totalErrors: number;
}
