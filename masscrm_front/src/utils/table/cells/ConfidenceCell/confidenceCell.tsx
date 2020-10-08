import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from '..';
import { ConfidenceEdit } from '.';
import { IConfidenceCell } from './interfaces/IConfidenceCell';

export const confidenceCell = ({ value, id, disabled }: IConfidenceCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const contentTD = () => <div>{value || null}</div>;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, id }}
      ContentTD={contentTD}
      ContentEdit={ConfidenceEdit}
      disabled={disabled}
    />
  );
};
