import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from '..';
import { ContactEdit } from '.';
import { IContactCell } from './interfaces';
import { ContactTD } from './ContactTD';

export const contactCell = (props: IContactCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const contentTD = () => <ContactTD {...props} />;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={props}
      ContentTD={contentTD}
      ContentEdit={ContactEdit}
    />
  );
};
