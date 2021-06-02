// TODO unify import/export status, now implemented by import status
// TODO take out the type of import/export status
export interface IStatusCell {
  rowId: number;
  status?: string;
  value?: number;
}

export interface IStatuses {
  [key: string]: number;
  Active: number;
  Inactive: number;
}
