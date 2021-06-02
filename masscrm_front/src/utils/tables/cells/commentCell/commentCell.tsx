import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from 'src/view/atoms';
import { ShowAllTD } from 'src/view/organisms';
import { ICommentCell } from 'src/interfaces';
import { Edit } from './components';

export const commentCell = ({
  value,
  doubleClickEdit,
  ...props
}: ICommentCell) => (tdProps: PropsWithChildren<TableCellBaseProps>) => {
  const ContentTD = () => <ShowAllTD value={value} />;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, ...props }}
      ContentTD={ContentTD}
      ContentEdit={Edit}
    />
  );
};
