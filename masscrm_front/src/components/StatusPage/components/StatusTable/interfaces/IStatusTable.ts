import {
  IExportDataTable,
  IImportDataTable,
  IStoreState
} from 'src/interfaces';

export interface IStatusTable {
  selector: (state: IStoreState) => IImportDataTable | IExportDataTable;
  getData: Function;
  setFilter: Function;
  dataMap: Function;
  getAutocomplete: Function;
  title?: string;
}
