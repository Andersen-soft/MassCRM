import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { GENDER_MAP } from 'src/utils';
import { IGenderCell } from 'src/interfaces';
import { EditPopup } from 'src/view/atoms';
import { Edit } from './components';

export const genderCell = ({ value, ...props }: IGenderCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const contentTD = () => <div>{value ? GENDER_MAP[value] : ''}</div>;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, ...props }}
      ContentTD={contentTD}
      ContentEdit={Edit}
    />
  );
};
