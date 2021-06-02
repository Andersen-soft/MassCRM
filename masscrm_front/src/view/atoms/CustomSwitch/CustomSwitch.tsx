import React, { FC } from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';
import { useStyles, disabledStyles } from './CustomSwitch.styles';

interface IProps {
  onChangeHandler?: (event?: any) => void;
  value: boolean;
  label?: string;
  name?: string;
  disabled?: boolean;
}

export const CustomSwitch: FC<IProps> = ({
  label,
  value,
  onChangeHandler,
  name,
  disabled
}) => {
  const styles = useStyles();
  const disabledClasses = disabledStyles();

  return (
    <FormControlLabel
      classes={{ root: styles.switch }}
      label={label}
      control={
        <Switch
          classes={{ switchBase: disabled ? disabledClasses.disabled : '' }}
          onChange={onChangeHandler}
          checked={value}
          name={name}
        />
      }
      labelPlacement='start'
    />
  );
};
