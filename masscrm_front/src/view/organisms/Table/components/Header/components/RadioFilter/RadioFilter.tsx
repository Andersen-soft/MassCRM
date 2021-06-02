import React, { ChangeEvent, FC, useState } from 'react';
import { FormControlLabel, Radio, RadioGroup, Box } from '@material-ui/core';
import { useStyles } from './RadioFilter.styles';

interface IProps {
  items?: string[];
  changeFilter: Function;
  name?: string;
  code?: string;
}

export const RadioFilter: FC<IProps> = ({
  changeFilter,
  code,
  name,
  items
}) => {
  const styles = useStyles();

  const [value, setValue] = useState('');

  const radioBtn = (
    <Radio color='default' size='medium' classes={{ root: styles.radioBtn }} />
  );

  const handlerOnChange = ({
    target: { value: item }
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(item);
    changeFilter({ code, item });
  };

  return (
    <Box className={styles.box}>
      <RadioGroup
        aria-label='gender'
        name={name}
        id={name}
        onChange={handlerOnChange}
        value={value}
        classes={{ root: styles.radio }}
      >
        {items?.map(item => (
          <FormControlLabel
            key={item}
            value={item}
            control={radioBtn}
            label={item}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};
