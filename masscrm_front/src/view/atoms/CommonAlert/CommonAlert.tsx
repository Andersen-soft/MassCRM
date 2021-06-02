import React, { FC, SyntheticEvent } from 'react';
import {
  ClickAwayListenerProps as MaterialClickAwayListenerProps,
  Snackbar,
  SnackbarOrigin
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AlertType } from 'src/interfaces';
import { BOTTOM, getPositionConfig, RIGHT } from 'src/constants';

interface IProps {
  open: boolean;
  onClose: (event: SyntheticEvent<Element, Event>) => void;
  errorMessage: string | JSX.Element[];
  type?: AlertType;
  ClickAwayListenerProps?: Partial<MaterialClickAwayListenerProps>;
}

export const CommonAlert: FC<IProps> = ({
  open,
  errorMessage,
  type,
  ClickAwayListenerProps,
  onClose,
  ...otherProps
}) => (
  <Snackbar
    open={!!open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={getPositionConfig(BOTTOM, RIGHT) as SnackbarOrigin}
    ClickAwayListenerProps={ClickAwayListenerProps}
  >
    <Alert
      elevation={6}
      variant='filled'
      {...otherProps}
      onClose={onClose}
      severity={type}
    >
      {Array.isArray(errorMessage) ? (
        <>
          {errorMessage?.map((item: JSX.Element) => (
            <div key={JSON.stringify(item)}>{item}</div>
          ))}
        </>
      ) : (
        errorMessage
      )}
    </Alert>
  </Snackbar>
);
