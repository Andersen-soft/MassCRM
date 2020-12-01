import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from '..';
import { CompanyEdit } from '.';
import { ICompanyCell } from './interfaces/ICompanyCell';

export const companyCell = ({ value, type, ...props }: ICompanyCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const contentTD = () => <div>{value?.map(({ name }) => name).join(',')}</div>;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, type, ...props }}
      ContentTD={contentTD}
      ContentEdit={CompanyEdit}
      disabled={!type}
    />
  );
};
