import {
  ITableConfig,
  ITableRow
} from 'src/components/common/Table/interfaces';
import { IExport, IImportModal } from '../../interfaces';
import { downLoadCell } from './cells';

export const exportTableConfig: ITableConfig = {
  rows: [
    {
      name: 'date',
      hasFilter: true,
      isFiltered: false,
      hasDataRangeFilter: true
    },
    {
      name: 'user',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'name',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'status',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'result',
      hasFilter: false,
      isFiltered: false
    }
  ],
  column: {},
  body: {}
};

export const exportTableMap = () => ({
  id,
  updated_at,
  name,
  user,
  status,
  file_path
}: IExport): ITableRow => ({
  id: id as number,
  cells: [
    {
      data: updated_at
    },
    {
      data: `${user?.name} ${user?.surname}`
    },
    {
      data: name
    },
    {
      data: status
    },
    {
      component: downLoadCell(name, file_path)
    }
  ]
});

export const importTableMap = (
  openModalHandler: (id: number) => () => void
) => ({
  id,
  updated_at,
  name,
  user,
  status,
  operation_id
}: IImportModal): ITableRow => ({
  id: id as number,
  cells: [
    {
      data: updated_at
    },
    {
      data: `${user?.name} ${user?.surname}`
    },
    {
      data: name
    },
    {
      data: status
    },
    {
      component: downLoadCell(
        name,
        undefined,
        operation_id ? openModalHandler(operation_id) : undefined
      )
    }
  ]
});

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
