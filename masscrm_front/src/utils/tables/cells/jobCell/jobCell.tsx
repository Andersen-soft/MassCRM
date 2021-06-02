import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { IJobCell } from 'src/interfaces';
import { EditPopup } from 'src/view/atoms';
import { ShowAllTD } from 'src/view/organisms';
import { Edit } from './components';

export const jobCell = ({
  fieldName,
  value,
  doubleClickEdit,
  ...props
}: IJobCell) => (tdProps: PropsWithChildren<TableCellBaseProps>) => {
  const ContentTD = () => (
    <ShowAllTD value={value?.map(item => item[fieldName] as string)} />
  );

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, ...props }}
      ContentTD={ContentTD}
      ContentEdit={Edit}
      doubleClickEdit={doubleClickEdit}
    />
  );
};
