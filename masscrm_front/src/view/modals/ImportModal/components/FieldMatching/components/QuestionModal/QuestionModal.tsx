import React, { useMemo, FC } from 'react';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { CommonButton } from 'src/view/atoms';
import { useStyles } from './QuestionModal.styles';

interface IProps {
  message: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

export const QuestionModal: FC<IProps> = ({ message, onConfirm, onClose }) => {
  const styles = useStyles();

  const memoizedContentClasses = useMemo(() => ({ root: styles.content }), [
    styles.content
  ]);

  return (
    <Dialog open={!!message}>
      <DialogContent classes={memoizedContentClasses}>
        <div className={styles.message}>{message}</div>
      </DialogContent>
      <DialogActions className={styles.actions}>
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
