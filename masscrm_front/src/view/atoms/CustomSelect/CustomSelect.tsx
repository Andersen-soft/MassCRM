import React, { ChangeEvent, FC, ReactNode, useMemo } from 'react';
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
import { commonInputStyles } from 'src/styles';
import { BOTTOM, CENTER, getPositionConfig, TOP } from 'src/constants';
import { useStyles } from './CustomSelect.styles';

interface IProps {
  items: string[];
  placeholder: string;
  multi?: boolean;
  value?: string | string[];
  name?: string;
  required?: boolean;
  errorMessage?: string | string[];
  width?: string;
  disabled?: boolean;
  hideClearBtn?: boolean;
  eventInResult?: boolean;
  onChange: Function;
  inputClassName?: string;
  information?: ReactNode;
}

export const CustomSelect: FC<IProps> = ({
  multi,
  placeholder,
  value = [],
  items,
  required,
  errorMessage,
  name,
  width = '230px',
  disabled,
  hideClearBtn,
  eventInResult,
  onChange,
  inputClassName,
  information
}) => {
  const commonInputClasses = commonInputStyles();
  const styles = useStyles();

  const cleanField = () => {
    onChange();
  };

  const onChangeHandler = (
    event: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    onChange(eventInResult ? event : (event.target.value as string[]));
  };

  const classInput = useMemo(
    () =>
      `${commonInputClasses.input} ${styles.FormLabel} ${required &&
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
        style={{ width }}
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
            className: styles.Paper,
            getContentAnchorEl: null,
            anchorOrigin: {
              ...getPositionConfig(BOTTOM, CENTER)
            },
            transformOrigin: {
              ...getPositionConfig(TOP, CENTER)
            }
          }}
          disabled={disabled}
          inputProps={{ id: name, name, className: 'selectInput' }}
          onChange={onChangeHandler}
          value={value}
          required={required}
          renderValue={
            multi
              ? selected => (
                  <div className={styles.multiCount}>
                    {(selected as string[]).length}
                  </div>
                )
              : undefined
          }
          multiple={multi}
          startAdornment={information}
          endAdornment={
            value && !hideClearBtn ? (
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
      {errorMessage && (
        <Box className={commonInputClasses.error}>{errorMessage}</Box>
      )}
    </div>
  );
};
