import React, { FC } from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { useStyles } from './Progress.styles';

interface IProps {
  value?: number;
}

export const Progress: FC<IProps> = ({ value }) => {
  const styles = useStyles();

  return (
    <Box position='relative' display='inline-flex' className={styles.root}>
      <div className={styles.root}>
        <CircularProgress
          value={100}
          variant='determinate'
          className={styles.bottom}
        />
        <CircularProgress
          variant='determinate'
          value={value}
          className={styles.top}
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
