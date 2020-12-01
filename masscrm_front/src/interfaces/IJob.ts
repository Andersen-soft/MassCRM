export interface IJob {
  [field: string]: number | string | undefined;
  id?: number;
  job?: string;
  skills?: string;
  link?: string;
}
