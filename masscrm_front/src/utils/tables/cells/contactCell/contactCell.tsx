import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from 'src/view/atoms';
import { IContactCell } from 'src/interfaces';
import { TD, Edit } from './components';

export const contactCell = (props: IContactCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const contentTD = () => <TD {...props} />;
  const { doubleClickEdit } = props;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={props}
      doubleClickEdit={doubleClickEdit}
      ContentTD={contentTD}
      ContentEdit={Edit}
    />
  );
};
