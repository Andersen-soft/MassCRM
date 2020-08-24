import React, { FC, useCallback } from 'react';
import { Box, FormControlLabel } from '@material-ui/core';
import { CustomCheckBox } from '../CustomCheckBox';
import { checkboxFilterStyle } from './CheckboxFilter.style';
import { ICheckboxFilterProps } from './interfaces';

export const CheckboxFilter: FC<ICheckboxFilterProps> = ({
  name,
  items,
  itemsChecked,
  changeFilter
}) => {
  const style = checkboxFilterStyle();

  const handlerOnChange = useCallback(
    (item: string) => () => {
      if (changeFilter) {
        changeFilter({ name, item, isCheckbox: true });
      }
    },
    [items]
  );

  return (
    <Box className={style.filter}>
      {items.map(item => (
        <FormControlLabel
          key={item}
          label={item}
          control={
            <CustomCheckBox
              onChange={handlerOnChange(item)}
              value={itemsChecked?.includes(item) || false}
            />
          }
        />
      ))}
    </Box>
  );
};
