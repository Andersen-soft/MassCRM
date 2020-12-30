import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup, ShowAllTD } from '..';
import { JobEdit } from '.';
import { IJobCell } from './IJobCell';

export const jobCell = ({ fieldName, value, ...props }: IJobCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const ContentTD = () => (
    <ShowAllTD value={value?.map(item => item[fieldName] as string)} />
  );

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, ...props }}
      ContentTD={ContentTD}
      ContentEdit={JobEdit}
    />
  );
};
