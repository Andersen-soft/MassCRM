import React, { FC } from 'react';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Box
} from '@material-ui/core';
import { genderStyle } from './Gender.style';
import { IGenderProps } from './interfaces';

export const Gender: FC<IGenderProps> = ({ onChangeHandler, name, value }) => {
  const style = genderStyle();

  const radioBtn = (
    <Radio color='default' size='small' classes={{ root: style.radioBtn }} />
  );

  return (
    <Box className={style.box}>
      <FormLabel component='legend' classes={{ root: style.label }}>
        Gender
      </FormLabel>
      <RadioGroup
        aria-label='gender'
        name={name}
        id={name}
        row
        onChange={onChangeHandler}
        value={value}
        classes={{ root: style.radio }}
      >
        <FormControlLabel value='m' control={radioBtn} label='Male' />
        <FormControlLabel value='f' control={radioBtn} label='Female' />
      </RadioGroup>
    </Box>
  );
};
