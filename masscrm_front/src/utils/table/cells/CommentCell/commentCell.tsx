import React from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { CommentEdit, CommentTD } from '.';
import { EditPopup } from '..';
import { ICommentCell } from './interfaces';

export const commentCell = ({ value, ...props }: ICommentCell) => (
  tdProps: React.PropsWithChildren<TableCellBaseProps>
) => {
  const ContentTD = () => <CommentTD value={value} />;

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, ...props }}
      ContentTD={ContentTD}
      ContentEdit={CommentEdit}
    />
  );
};
