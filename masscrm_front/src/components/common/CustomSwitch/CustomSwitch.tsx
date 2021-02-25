import React, { FC } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core';
import { ICustomSwitch } from './interfaces';
import { switchStyle } from './CustomSwitch.style';

export const CustomSwitch: FC<ICustomSwitch> = ({
  label,
  value,
  onChangeHandler,
  name,
  disabled
}) => {
  const style = switchStyle();

  const useStyles = makeStyles(() => ({
    disabled: {
      cursor: 'default',
      '&:hover': {
        backgroundColor: 'inherit'
      }
    }
  }));

  const classes = useStyles();

  return (
    <FormControlLabel
      classes={{ root: style.switch }}
      label={label}
      control={
        <Switch
          classes={{ switchBase: disabled ? classes.disabled : '' }}
          onChange={onChangeHandler}
          checked={value}
          name={name}
        />
      }
      labelPlacement='start'
    />
  );
};
