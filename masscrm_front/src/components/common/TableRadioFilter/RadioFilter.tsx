import React, { ChangeEvent, FC, useState } from 'react';
import { FormControlLabel, Radio, RadioGroup, Box } from '@material-ui/core';
import { radioFilterStyle } from './RadioFilter.style';
import { ITableRadioFilterProps } from './interfaces';

export const RadioFilter: FC<ITableRadioFilterProps> = ({
  changeFilter,
  name,
  items
}) => {
  const style = radioFilterStyle();
  const [value, setValue] = useState<string>('');
  const radioBtn = (
    <Radio color='default' size='medium' classes={{ root: style.radioBtn }} />
  );

  const handlerOnChange = ({
    target: { value: item }
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(item);
    changeFilter({ name, item });
  };

  return (
    <Box className={style.box}>
      <RadioGroup
        aria-label='gender'
        name={name}
        id={name}
        onChange={handlerOnChange}
        value={value}
        classes={{ root: style.radio }}
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
