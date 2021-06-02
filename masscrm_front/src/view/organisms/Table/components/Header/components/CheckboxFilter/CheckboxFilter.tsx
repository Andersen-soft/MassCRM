import React, { FC, useCallback } from 'react';
import { Box, FormControlLabel } from '@material-ui/core';
import { CustomCheckBox } from 'src/view/atoms';
import { useStyles } from './CheckboxFilter.styles';

interface IProps {
  code: string;
  name: string;
  items: string[];
  itemsChecked: (string | string[])[];
  changeFilter?: (value: {
    code: string;
    item: string | string[] | null;
    isCheckbox?: boolean;
  }) => void;
}

export const CheckboxFilter: FC<IProps> = ({
  code,
  items,
  itemsChecked,
  changeFilter
}) => {
  const styles = useStyles();

  const handlerOnChange = useCallback(
    (item: string) => () => {
      if (changeFilter) {
        changeFilter({ code, item, isCheckbox: true });
      }
    },
    [items]
  );

  return (
    <Box className={styles.filter}>
      {items.map(item => (
        <FormControlLabel
          key={item}
          label={item}
          control={
            <CustomCheckBox
              onChange={handlerOnChange(item)}
              value={itemsChecked?.includes(item)}
            />
          }
        />
      ))}
    </Box>
  );
};
