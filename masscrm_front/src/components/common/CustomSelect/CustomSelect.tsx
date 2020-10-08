import React, { ChangeEvent, FC, useMemo } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  Box
} from '@material-ui/core';
import 'src/styles/main.scss';
import { Close } from '@material-ui/icons';
import { inputStyle } from 'src/styles/CommonInput.style';
import { selectStyle } from './CustomSelect.style';
import { ICustomSelectProps } from './interfaces';

export const CustomSelect: FC<ICustomSelectProps> = ({
  multi,
  placeholder,
  value = undefined,
  items,
  required,
  errorMessage,
  name,
  width,
  disabled,
  hideClearBtn,
  eventInResult,
  onChange,
  inputClassName,
  information
}) => {
  const inputStyles = inputStyle();
  const styles = selectStyle();
  const cleanField = () => {
    onChange();
  };

  const onChangeHandler = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    onChange(eventInResult ? event : (event.target?.value as Array<string>));
  };

  const classInput = useMemo(
    () =>
      `${inputStyles.input} ${styles.FormLabel} ${required &&
        styles.required} ${errorMessage && styles.error} ${inputClassName &&
        inputClassName}`,
    [required, errorMessage, inputClassName]
  );

  const classLabel = useMemo(
    () => ({
      outlined: styles.InputLabelOutlined,
      shrink: styles.InputLabelShrink
    }),
    []
  );

  const classSelect = useMemo(
    () => ({
      icon: styles.customSelectIcon,
      outlined: styles.customSelectOutlined
    }),
    []
  );

  const classIcon = useMemo(
    () => ({
      edgeEnd: styles.IconBtnEdgeEnd,
      label: multi ? styles.MultiIconButtonLabel : '',
      root: styles.IconButtonRoot
    }),
    [multi]
  );

  const classClose = useMemo(
    () => ({ fontSizeSmall: styles.SvgIconFontSizeSmall }),
    []
  );

  return (
    <div className={styles.wrap}>
      <FormControl
        style={{ width: width || '230px' }}
        variant='outlined'
        classes={{
          root: classInput
        }}
      >
        <InputLabel id={name} classes={classLabel}>
          {placeholder}
        </InputLabel>
        <Select
          classes={classSelect}
          MenuProps={{
            className: styles.Paper
          }}
          disabled={disabled}
          inputProps={{ id: name, name, className: 'selectInput' }}
          onChange={onChangeHandler}
          value={value || []}
          required={required}
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
          startAdornment={information}
          endAdornment={
            Boolean(value) && !hideClearBtn ? (
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
                  classes={classIcon}
                >
                  <Close fontSize='small' classes={classClose} />
                </IconButton>
              </InputAdornment>
            ) : (
              undefined
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
      {errorMessage && <Box className={inputStyles.error}>{errorMessage}</Box>}
    </div>
  );
};
