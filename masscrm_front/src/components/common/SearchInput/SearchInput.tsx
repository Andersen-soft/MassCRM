import React, { ChangeEvent, FC, useMemo, useCallback } from 'react';
import { FormControl, TextField, Box } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search } from '@material-ui/icons';
import { inputStyle } from 'src/styles/CommonInput.style';
import { ISearchInputProps, ISearchItem } from './interfaces';
import { searchStyle } from './SearchInput.style';

export const SearchInput: FC<ISearchInputProps> = ({
  width,
  placeholder,
  onChange,
  onSelect,
  items,
  value,
  name,
  errorMessage,
  required,
  disabled,
  className,
  inputValue,
  freeSolo = true,
  onBlur,
  onFocus
}) => {
  const style = inputStyle();
  const classes = searchStyle();
  const rootClasses = useMemo(
    () => ({
      root: `${style.input} ${classes.search} ${required &&
        classes.required} ${className}`
    }),
    [className, classes.required, classes.search, required, style.input]
  );

  const handleChange = (event: ChangeEvent<{}>, val: string) => {
    onChange(val);
  };

  const handleChangeInput = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  const handleSelect = (
    event: ChangeEvent<{}>,
    val: string | ISearchItem | null
  ) => {
    if (onSelect) {
      onSelect(val);
    }
  };

  const handleGetOptionSelected = useCallback(
    (option: string | ISearchItem, currentValue: string | ISearchItem) =>
      typeof option === 'object' && typeof currentValue === 'object'
        ? option.key === currentValue.key
        : option === currentValue,
    []
  );

  const handleGetOptionLabel = useCallback(
    (option: string | ISearchItem) =>
      typeof option === 'string' ? option : option.label,
    []
  );

  return (
    <>
      <FormControl style={{ width }} variant='outlined' classes={rootClasses}>
        <Autocomplete
          id={name}
          options={items}
          freeSolo={freeSolo}
          value={value}
          defaultValue={value}
          inputValue={inputValue}
          onInputChange={handleChange}
          onChange={onSelect && handleSelect}
          getOptionSelected={handleGetOptionSelected}
          getOptionLabel={handleGetOptionLabel}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          blurOnSelect
          openOnFocus
          renderInput={params => (
            <div className={classes.searchWrap}>
              <TextField
                {...params}
                id={name}
                name={name}
                label={placeholder}
                variant='outlined'
                error={!!errorMessage}
                onChange={handleChangeInput}
              />
              <Search
                className={`${classes.searchIcon} search-icon ${disabled &&
                  classes.disabledIcon}`}
              />
            </div>
          )}
        />
      </FormControl>
      {errorMessage && <Box className={style.error}>{errorMessage}</Box>}
    </>
  );
};
