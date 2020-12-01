import React, { ChangeEvent, FC } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { Box, FormControl, TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { setMultiFilterValues } from 'src/actions';
import { getMultiFilterValues } from 'src/selectors';
import { IInputFilterProps } from './interfaces';
import { inputStyle } from '../../../styles/CommonInput.style';
import { searchStyle } from './InputFilter.style';
import { CommonButton } from '../CommonButton';

export const InputFilter: FC<IInputFilterProps> = ({
  multiSelect,
  changeInput,
  changeFilter,
  placeholder,
  items,
  value,
  name,
  errorMessage,
  mainFilter,
  className
}) => {
  const style = inputStyle();
  const classes = searchStyle();
  const multiFilterState = useSelector(getMultiFilterValues);
  const dispatch = useDispatch();

  const handleMultiChange = (
    event: ChangeEvent<{}>,
    multiItem: string | string[] | (string | string[])[] | null
  ) => {
    if (multiItem && Array.isArray(multiItem)) {
      dispatch(
        setMultiFilterValues({
          [name]: multiItem.flat()
        })
      );
    }
  };

  const onClickSearch = () => {
    changeFilter({ name, item: multiFilterState[name] });
  };

  const handleChange = (
    event: ChangeEvent<{}>,
    item: string | string[] | (string | string[])[] | null
  ) => {
    changeFilter({ name, item });
  };

  const handleChangeInput = (event: ChangeEvent<{}>, inputValue: string) => {
    changeInput && changeInput(inputValue, name);
  };

  const withoutRepeat = (itemsArr: string[], existArr: string[]) => {
    return itemsArr.filter(id => !existArr.includes(id));
  };

  return (
    <>
      <FormControl
        variant='outlined'
        classes={{
          root: `${style.input} ${
            multiSelect ? style.multiInputFilter : style.soloInput
          } ${classes.search}`
        }}
      >
        <Autocomplete
          id={name}
          multiple={multiSelect}
          limitTags={1}
          size='small'
          options={
            items &&
            ((!mainFilter &&
              multiSelect &&
              withoutRepeat(items, multiFilterState[name])) ||
              items)
          }
          autoHighlight
          disableCloseOnSelect={!!multiSelect}
          value={!mainFilter && multiSelect ? multiFilterState[name] : value}
          onChange={
            !mainFilter && multiSelect ? handleMultiChange : handleChange
          }
          onInputChange={handleChangeInput}
          getOptionLabel={option => option as string}
          renderOption={(option, { selected }) =>
            multiSelect ? (
              <>
                <Checkbox className={classes.checkbox} checked={selected} />
                {option}
              </>
            ) : (
              <>{option}</>
            )
          }
          renderInput={params => (
            <div className={classes.searchWrap}>
              <TextField
                label={placeholder}
                className={className || classes.input}
                {...params}
                id={name}
                name={name}
                variant='outlined'
                error={!!errorMessage}
              />
              {!mainFilter && multiSelect && (
                <CommonButton
                  text='Search'
                  color='yellow'
                  disabled={!multiFilterState[name].length}
                  onClickHandler={onClickSearch}
                />
              )}
            </div>
          )}
        />
      </FormControl>
      {errorMessage && <Box className={style.error}>{errorMessage}</Box>}
    </>
  );
};
