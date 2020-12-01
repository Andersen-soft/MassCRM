import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { GENDER_MAP } from 'src/utils/map';
import { EditPopup } from '..';
import { GenderEdit } from '.';
import { IGenderCell } from './interfaces';

export const genderCell = ({ value, ...props }: IGenderCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const contentTD = () => <div>{value ? GENDER_MAP[value] : ''}</div>;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, ...props }}
      ContentTD={contentTD}
      ContentEdit={GenderEdit}
    />
  );
};
