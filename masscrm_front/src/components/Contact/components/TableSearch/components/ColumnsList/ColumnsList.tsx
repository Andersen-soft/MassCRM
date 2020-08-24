import React, { FC, useCallback } from 'react';
import { Box, FormControlLabel } from '@material-ui/core';
import { CustomCheckBox } from 'src/components/common';
import { IColumnsList } from '../../interfaces';
import { columnsListStyle } from './ColumnsList.style';

export const ColumnsList: FC<IColumnsList> = ({
  items,
  itemsChecked,
  onChangeFilter
}) => {
  const style = columnsListStyle();
  const handlerOnChange = useCallback(
    (item: string) => () => onChangeFilter(item),
    [items]
  );

  const isInArray = (itemCode: string) =>
    itemsChecked?.includes(itemCode) || false;

  return (
    <Box className={style.filter}>
      {items.map(
        ({ name, code }) =>
          code && (
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
          )
      )}
    </Box>
  );
};
