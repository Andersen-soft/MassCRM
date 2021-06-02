import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from 'src/view/atoms';
import { ITypeCompanyCell } from 'src/interfaces';
import { Edit } from './components';

export const typeCompanyCell = ({
  value,
  id,
  doubleClickEdit
}: ITypeCompanyCell) => (tdProps: PropsWithChildren<TableCellBaseProps>) => {
  const contentTD = () => <div>{value}</div>;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, id }}
      ContentTD={contentTD}
      ContentEdit={Edit}
      doubleClickEdit={doubleClickEdit}
    />
  );
};
