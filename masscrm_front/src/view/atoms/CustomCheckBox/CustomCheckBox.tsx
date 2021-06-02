import React, { ChangeEvent, FC } from 'react';
import { Done as DoneIcon } from '@material-ui/icons';
import { Checkbox } from '@material-ui/core';
import { useStyles } from './CustomCheckBox.style';

interface IProps {
  value?: boolean;
  onChange: (value: boolean) => void;
  indeterminateCheckbox?: boolean;
}

export const CustomCheckBox: FC<IProps> = ({
  value,
  indeterminateCheckbox,
  onChange
}) => {
  const styles = useStyles();

  const handleChange = ({
    target: { checked }
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(checked);
  };

  return (
    <Checkbox
      classes={{ root: styles.checkBox }}
      checked={value}
      indeterminate={indeterminateCheckbox}
      onChange={handleChange}
      color='default'
      checkedIcon={<DoneIcon fontSize='small' />}
      icon={<></>}
    />
  );
};

export default CustomCheckBox;
