import { IStatusCell, ITableConfig, IExport, ITableRow } from 'src/interfaces';
import { StatusCell } from 'src/view/organisms';
import { downloadCell } from 'src/utils';

export const exportTableMap = () => ({
  id,
  updated_at,
  name,
  user,
  status,
  file_path,
  type
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
      component: StatusCell({ status, type, rowId: id } as IStatusCell)
    },
    {
      component: downloadCell(name, file_path)
    }
  ]
});

export const exportTableConfig: ITableConfig = {
  rows: [
    {
      code: 'date',
      name: 'date',
      hasFilter: true,
      isFiltered: false,
      hasDataRangeFilter: true
    },
    {
      code: 'user',
      name: 'user',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'name',
      name: 'name',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'status',
      name: 'status',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'result',
      name: 'result',
      hasFilter: false,
      isFiltered: false
    }
  ],
  column: {},
  body: {}
};
