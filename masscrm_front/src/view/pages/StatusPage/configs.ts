import { IStatusCell, ITableRow, IExport, IImportModal } from 'src/interfaces';
import {
  getAutocompleteExport,
  getAutocompleteImport,
  getExportList,
  getImportList,
  setExportFilter,
  setImportFilter,
  getExportDataTableSelector,
  getImportDataTableSelector
} from 'src/store/slices';
import { StatusCell } from 'src/view/organisms';
import { downloadCell } from 'src/utils';

export const importTableMap = (
  openModalHandler: (id: number) => () => void
) => ({
  id,
  updated_at,
  name,
  user,
  status,
  operation_id,
  type
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
      component: StatusCell({ status, type, rowId: id } as IStatusCell)
    },
    {
      component: downloadCell(
        name,
        undefined,
        operation_id ? openModalHandler(operation_id) : undefined
      )
    }
  ]
});

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

export const configs = {
  importMethods: {
    selector: getImportDataTableSelector,
    getData: getImportList,
    setFilter: setImportFilter,
    dataMap: importTableMap,
    getAutocomplete: getAutocompleteImport,
    title: 'Import details'
  },
  exportMethods: {
    selector: getExportDataTableSelector,
    getData: getExportList,
    setFilter: setExportFilter,
    dataMap: exportTableMap,
    getAutocomplete: getAutocompleteExport,
    title: 'Export details'
  }
};
