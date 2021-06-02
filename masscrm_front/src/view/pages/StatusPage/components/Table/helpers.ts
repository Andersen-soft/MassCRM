import { IExport, IImportModal } from 'src/interfaces';

export const MAP_AUTOCOMPLETE_EXPORT: any = {
  user: (acc: { result: string }, current: IExport | IImportModal) =>
    current.user
      ? [...acc.result, `${current.user.name} ${current.user.surname}`]
      : [...acc.result],
  name: (acc: { result: string }, current: IExport | IImportModal) =>
    current.name ? [...acc.result, current.name] : [...acc.result],
  status: (acc: { result: string }, current: IExport | IImportModal) =>
    current.status ? [...acc.result, current.status] : [...acc.result]
};

export interface IMapExportImportRequest {
  [index: string]: (value: string, date: object, limit?: number) => void;
  user: (value: string, date: object, limit?: number) => void;
  name: (value: string, date: object, limit?: number) => void;
  status: (value: string, date: object, limit?: number) => void;
}

export const MAP_REQUEST_EXPORT: IMapExportImportRequest = {
  user: (value: string, date: object, limit?: number) => {
    return {
      limit,
      search: {
        date,
        user: value
      }
    };
  },
  name: (value: string, date: object, limit?: number) => {
    return {
      limit,
      search: {
        date,
        name: value
      }
    };
  },
  status: (value: string, date: object, limit?: number) => {
    return {
      limit,
      search: {
        date,
        status: value
      }
    };
  }
};
