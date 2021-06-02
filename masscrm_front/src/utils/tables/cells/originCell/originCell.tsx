import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { IOriginCell } from 'src/interfaces';
import { EditPopup } from 'src/view/atoms';
import { ShowAllTD } from 'src/view/organisms';
import { Edit } from './components';

export const originCell = ({ value, id, doubleClickEdit }: IOriginCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const ContentTD = () => <ShowAllTD value={value} />;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, id }}
      ContentTD={ContentTD}
      ContentEdit={Edit}
      doubleClickEdit={doubleClickEdit}
    />
  );
};
