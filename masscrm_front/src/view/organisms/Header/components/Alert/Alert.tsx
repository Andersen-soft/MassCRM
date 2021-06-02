import React from 'react';
import { Alert as MuiAlert, AlertProps } from '@material-ui/lab';

export const Alert = (props: AlertProps) => (
  <MuiAlert elevation={6} variant='filled' {...props} />
);

export default Alert;
