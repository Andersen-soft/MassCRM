import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from 'src/view/atoms';
import { IConfidenceCell } from 'src/interfaces';
import { Edit } from './components';

export const confidenceCell = ({
  value,
  id,
  disabled,
  doubleClickEdit
}: IConfidenceCell) => (tdProps: PropsWithChildren<TableCellBaseProps>) => {
  const contentTD = () => <div>{value || null}</div>;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, id }}
      ContentTD={contentTD}
      ContentEdit={Edit}
      disabled={disabled}
      doubleClickEdit={doubleClickEdit}
    />
  );
};
