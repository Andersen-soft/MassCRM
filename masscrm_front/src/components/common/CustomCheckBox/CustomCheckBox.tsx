import React, { ChangeEvent, FC } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import { Checkbox } from '@material-ui/core';
import { ICustomCheckBoxProps } from './interfaces';
import { checkBoxStyle } from './CustomCheckBox.style';

export const CustomCheckBox: FC<ICustomCheckBoxProps> = ({
  value,
  onChange
}) => {
  const style = checkBoxStyle();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <Checkbox
      classes={{ root: style.checkBox }}
      checked={value}
      onChange={handleChange}
      color='default'
      checkedIcon={<DoneIcon fontSize='small' />}
      icon={<></>}
    />
  );
};
