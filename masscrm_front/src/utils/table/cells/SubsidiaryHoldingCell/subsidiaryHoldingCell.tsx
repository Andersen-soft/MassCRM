import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from '..';
import { SubsidiaryHoldingEdit } from '.';
import { ISubsidiaryHoldingCell } from './interfaces/ISubsidiaryHoldingCell';

export const subsidiaryHoldingCell = ({
  value,
  type,
  ...props
}: ISubsidiaryHoldingCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const contentTD = () => <div>{value?.map(({ name }) => name).join(',')}</div>;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, type, ...props }}
      ContentTD={contentTD}
      ContentEdit={SubsidiaryHoldingEdit}
      disabled={!type}
    />
  );
};
