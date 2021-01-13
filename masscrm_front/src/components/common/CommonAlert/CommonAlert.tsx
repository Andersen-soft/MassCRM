import React, { FC, SyntheticEvent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { ClickAwayListenerProps as MaterialClickAwayListenerProps } from '@material-ui/core/ClickAwayListener';
import MuiAlert from '@material-ui/lab/Alert';

export type TAlertType = 'success' | 'info' | 'warning' | 'error';

interface ICommonAlert {
  open: boolean;
  onClose: (event: SyntheticEvent<Element, Event>) => void;
  errorMessage: string | JSX.Element[];
  type?: TAlertType;
  ClickAwayListenerProps?: Partial<MaterialClickAwayListenerProps>;
}

export const CommonAlert: FC<ICommonAlert> = props => {
  const {
    open,
    errorMessage,
    type,
    ClickAwayListenerProps,
    onClose,
    ...otherProps
  } = props;

  return (
    <Snackbar
      open={Boolean(open)}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      ClickAwayListenerProps={ClickAwayListenerProps}
    >
      <MuiAlert
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
      </MuiAlert>
    </Snackbar>
  );
};
