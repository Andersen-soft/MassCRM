import { IReportSortingState } from 'src/interfaces';

export const initialReportSortingState: IReportSortingState = {
  created: {
    field_name: 'created',
    type_sort: 'DESC'
  },
  updated: {
    field_name: 'updated',
    type_sort: 'DESC'
  },
  total: {
    field_name: 'total',
    type_sort: 'DESC'
  }
  // TODO add other fields after Draft-page implementation
};
