import React, { ChangeEvent, FC } from 'react';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Box
} from '@material-ui/core';
import { useStyles } from './Gender.styles';

interface IProps {
  value?: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  errorMessage?: string;
  required?: boolean;
}

export const Gender: FC<IProps> = ({
  onChangeHandler,
  name,
  value,
  required,
  errorMessage
}) => {
  const styles = useStyles();

  const radioBtn = (
    <Radio
      color='default'
      size='small'
      classes={{ root: styles.radioBtn }}
      required={required}
    />
  );

  return (
    <Box className={styles.box}>
      <FormLabel component='legend' classes={{ root: styles.label }}>
        Gender
      </FormLabel>
      <RadioGroup
        aria-label='gender'
        name={name}
        id={name}
        row
        onChange={onChangeHandler}
        value={value}
        classes={{ root: styles.radio }}
      >
        <FormControlLabel value='m' control={radioBtn} label='Male' />
        <FormControlLabel value='f' control={radioBtn} label='Female' />
        <FormControlLabel value='' control={radioBtn} label='Not defined' />
      </RadioGroup>
      {errorMessage && <Box className={styles.error}>{errorMessage}</Box>}
    </Box>
  );
};
