import React, { FC } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ICustomSwitch } from './interfaces';
import { switchStyle } from './CustomSwitch.style';

export const CustomSwitch: FC<ICustomSwitch> = ({
  label,
  value,
  onChangeHandler,
  name
}) => {
  const style = switchStyle();

  return (
    <FormControlLabel
      classes={{ root: style.switch }}
      label={label}
      control={
        <Switch onChange={onChangeHandler} checked={value} name={name} />
      }
      labelPlacement='start'
    />
  );
};
