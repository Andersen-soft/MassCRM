import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from '..';
import { TypeCompanyEdit } from '.';
import { ITypeCompanyCell } from './interfaces/ITypeCompanyCell';

export const typeCompanyCell = ({ value, id }: ITypeCompanyCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const contentTD = () => <div>{value}</div>;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, id }}
      ContentTD={contentTD}
      ContentEdit={TypeCompanyEdit}
    />
  );
};
