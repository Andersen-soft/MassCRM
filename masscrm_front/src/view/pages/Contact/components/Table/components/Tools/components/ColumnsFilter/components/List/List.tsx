import React, { FC, useCallback } from 'react';
import { Box, FormControlLabel } from '@material-ui/core';
import { CustomCheckBox } from 'src/view/atoms';
import { useStyles } from './List.styles';

interface IProps {
  items: { name: string; code?: string }[];
  itemsChecked?: string[];
  onChangeFilter: (value: string) => void;
  onChangeAllFilter: () => void;
  indeterminateCheckbox?: boolean;
}

export const List: FC<IProps> = ({
  items,
  itemsChecked,
  indeterminateCheckbox,
  onChangeFilter,
  onChangeAllFilter
}) => {
  const styles = useStyles();

  const handlerOnChange = useCallback(
    (item: string) => () => onChangeFilter(item),
    [items]
  );

  const isInArray = (itemCode: string) => itemsChecked?.includes(itemCode);

  return (
    <Box className={styles.wrapper}>
      <FormControlLabel
        label={indeterminateCheckbox ? 'Reset all' : 'Select all'}
        control={
          <CustomCheckBox
            indeterminateCheckbox={indeterminateCheckbox}
            onChange={onChangeAllFilter}
            value={false}
          />
        }
      />
      <div className={styles.filter}>
        {items.reduce((result: JSX.Element[], { name, code }) => {
          if (!code) return result;

          return [
            ...result,
            <FormControlLabel
              key={code}
              label={name}
              control={
                <CustomCheckBox
                  onChange={handlerOnChange(code)}
                  value={isInArray(code)}
                />
              }
            />
          ];
        }, [])}
      </div>
    </Box>
  );
};
