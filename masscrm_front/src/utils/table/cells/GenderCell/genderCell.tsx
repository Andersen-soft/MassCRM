import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from '..';
import { GenderEdit } from '.';
import { IGenderCell } from './interfaces';

export const genderCell = ({ value, ...props }: IGenderCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const GENDER_MAP: { [key: string]: string } = {
    m: 'Male',
    f: 'Female'
  };
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
