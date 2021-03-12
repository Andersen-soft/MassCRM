import React, { FC } from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { progressStyle } from './Progress.styles';

interface IProgressProps {
  value?: number;
}

export const Progress: FC<IProgressProps> = ({ value }) => {
  const style = progressStyle();

  return (
    <Box position='relative' display='inline-flex' className={style.root}>
      <div className={style.root}>
        <CircularProgress
          value={100}
          variant='determinate'
          className={style.bottom}
        />
        <CircularProgress
          variant='determinate'
          value={value}
          className={style.top}
        />
      </div>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography
          variant='caption'
          component='div'
          color='textSecondary'
        >{`${Math.round(value ?? 0)}%`}</Typography>
      </Box>
    </Box>
  );
};
