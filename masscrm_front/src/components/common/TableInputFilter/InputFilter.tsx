import React, { ChangeEvent, FC } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { FormControl, TextField, Box } from '@material-ui/core';
import { IInputFilterProps } from './interfaces';
import { inputStyle } from '../../../styles/CommonInput.style';
import { searchStyle } from './InputFilter.style';

export const InputFilter: FC<IInputFilterProps> = ({
  multiSelect,
  changeInput,
  changeFilter,
  placeholder,
  items,
  value,
  name,
  errorMessage
}) => {
  const style = inputStyle();
  const classes = searchStyle();

  const handleChange = (
    event: ChangeEvent<{}>,
    item: string | string[] | (string | string[])[] | null
  ) => {
    changeFilter({ name, item });
  };

  const handleChangeInput = (event: ChangeEvent<{}>, inputValue: string) => {
    changeInput && changeInput(inputValue, name);
  };

  return (
    <>
      <FormControl
        variant='outlined'
        classes={{ root: `${style.input} ${classes.search}` }}
      >
        <Autocomplete
          id={name}
          multiple={multiSelect}
          limitTags={1}
          size='small'
          options={items}
          autoHighlight
          value={value}
          onChange={handleChange}
          onInputChange={handleChangeInput}
          getOptionLabel={option => option as string}
          renderOption={option => <>{option}</>}
          renderInput={params => (
            <div className={classes.searchWrap}>
              <TextField
                {...params}
                id={name}
                name={name}
                placeholder={placeholder}
                variant='outlined'
                error={!!errorMessage}
              />
            </div>
          )}
        />
      </FormControl>
      {errorMessage && <Box className={style.error}>{errorMessage}</Box>}
    </>
  );
};
