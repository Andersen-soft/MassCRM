import React, { FC, useCallback } from 'react';
import { Box, FormControlLabel } from '@material-ui/core';
import { CustomCheckBox } from 'src/components/common';
import { IColumnsList } from '../../interfaces';
import { columnsListStyle } from './ColumnsList.style';

export const ColumnsList: FC<IColumnsList> = ({
  items,
  itemsChecked,
  indeterminateCheckbox,
  onChangeFilter,
  onChangeAllFilter
}) => {
  const style = columnsListStyle();
  const handlerOnChange = useCallback(
    (item: string) => () => onChangeFilter(item),
    [items]
  );

  const isInArray = (itemCode: string) =>
    itemsChecked?.includes(itemCode) || false;

  return (
    <Box className={style.wrapper}>
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
      <div className={style.filter}>
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
