import { IMinMax } from './IMinMax';

export interface ISale {
  [key: string]: string | number;
  id: number;
  status: string;
  created_at: string;
  link: string;
  project_c1: string;
  source: string;
}
export interface ISaleSearch {
  id?: number;
  created_at?: IMinMax;
  source?: string[];
  link?: string;
  status?: string[];
  project_c1?: number;
}
