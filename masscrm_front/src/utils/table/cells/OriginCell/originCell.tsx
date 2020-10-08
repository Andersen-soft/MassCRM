import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup, ShowAllTD } from '..';
import { OriginEdit } from '.';
import { IOriginCell } from './interfaces/IOriginCell';

export const originCell = ({ value, id }: IOriginCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const ContentTD = () => <ShowAllTD value={value} />;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, id }}
      ContentTD={ContentTD}
      ContentEdit={OriginEdit}
    />
  );
};
