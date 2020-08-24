import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { styleNames } from 'src/services';
import style from './Loader.scss';

const sn = styleNames(style);

export const Loader = () => {
  return (
    <div className={sn('loaderWrapper')}>
      <CircularProgress className={sn('loader')} />
    </div>
  );
};
