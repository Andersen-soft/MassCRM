import React, { ChangeEvent, FC } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select
} from '@material-ui/core';
import 'src/styles/main.scss';
import { Close } from '@material-ui/icons';
import { inputStyle } from 'src/styles/CommonInput.style';
import { selectStyle } from './MultiSelectFilter.style';
import { IMultiSelectFilterProps } from './interfaces';

export const MultiSelectFilter: FC<IMultiSelectFilterProps> = ({
  multi,
  resetFilter,
  changeFilter,
  value = [],
  items,
  name
}) => {
  const styles = selectStyle();

  const cleanField = () => {
    return resetFilter && resetFilter(name)();
  };

  const onChangeHandler = (
    val: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const item = val.target?.value as Array<string>;
    if (changeFilter) {
      changeFilter({ name, item });
    }
  };

  return (
    <FormControl
      variant='outlined'
      classes={{
        root: `${inputStyle()} ${styles.FormLabelFilter}`
      }}
    >
      <Select
        classes={{
          icon: styles.customSelectIcon,
          outlined: styles.customSelectOutlined
        }}
        MenuProps={{
          className: styles.Paper
        }}
        inputProps={{ id: name, name, className: 'selectInput' }}
        onChange={onChangeHandler}
        value={value || []}
        renderValue={
          multi
            ? selected => (
                <div className={styles.multiCount}>
                  {(selected as Array<string>).length}
                </div>
              )
            : undefined
        }
        multiple={multi}
        endAdornment={
          Boolean(value) && (
            <InputAdornment
              position='end'
              classes={{
                positionEnd: styles.InputAdornmentPositionEnd
              }}
            >
              <IconButton
                aria-label=''
                onClick={cleanField}
                onMouseDown={() => false}
                edge='end'
                classes={{
                  edgeEnd: styles.IconBtnEdgeEnd,
                  label: multi ? styles.MultiIconButtonLabel : '',
                  root: styles.IconButtonRoot
                }}
              >
                <Close
                  fontSize='small'
                  classes={{ fontSizeSmall: styles.SvgIconFontSizeSmall }}
                />
              </IconButton>
            </InputAdornment>
          )
        }
      >
        {items.map(item => (
          <MenuItem value={item} key={item} className={styles.ListItemBtn}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
