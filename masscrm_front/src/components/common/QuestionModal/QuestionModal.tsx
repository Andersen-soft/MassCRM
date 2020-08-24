import React from 'react';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

import { CommonButton } from '../CommonButton';
import { useStyles } from './QuestionModal.styles';

export interface IPopUp {
  message: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

export const QuestionModal = ({ message, onConfirm, onClose }: IPopUp) => {
  const classes = useStyles();
  const memoizedContentClasses = React.useMemo(
    () => ({ root: classes.content }),
    [classes.content]
  );

  return (
    <Dialog open={Boolean(message)}>
      <DialogContent classes={memoizedContentClasses}>
        <div className={classes.message}>{message}</div>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <CommonButton onClickHandler={onClose} text='Cancel' />
        <CommonButton
          onClickHandler={onConfirm}
          text='Confirm'
          color='yellow'
        />
      </DialogActions>
    </Dialog>
  );
};
