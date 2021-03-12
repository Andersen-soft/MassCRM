import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { Header } from 'src/components/common';
import {
  getExportDataTableSelector,
  getImportDataTableSelector
} from 'src/selectors';
import {
  getAutocompleteExport,
  getAutocompleteImport,
  getExportList,
  getImportList,
  setExportFilter,
  setImportFilter
} from 'src/actions';
import { exportTableMap, importTableMap } from 'src/utils/table';
import style from './StatusPage.scss';
import { StatusTable } from './components';

const sn = styleNames(style);

const configs = {
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

export const StatusPage: FC<{ isImport?: boolean }> = ({ isImport }) => {
  const currentConfig = isImport
    ? configs.importMethods
    : configs.exportMethods;

  return (
    <>
      <Header />
      <div className='container'>
        <div className={sn('status')}>
          <StatusTable {...currentConfig} />
        </div>
      </div>
    </>
  );
};

export default StatusPage;
