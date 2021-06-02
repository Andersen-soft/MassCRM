import React, { ChangeEvent, FC, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import {
  Box,
  FormControl,
  TextField,
  Checkbox,
  CircularProgress
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getAutocomplete } from 'src/store/slices';
import { CommonButton } from 'src/view/atoms';
import { commonInputStyles } from 'src/styles';
import { initialMultiFilterState } from 'src/constants';
import { IMultiFilterState } from 'src/interfaces';
import { useStyles } from './TableInputFilter.styles';
import { exceptionFields } from './constants';

interface IProps {
  placeholder: string;
  items: string[];
  mainFilter?: boolean;
  className?: string;
  changeFilter: (value: {
    code: string;
    item: string | string[] | (string | string[])[] | null;
    isCheckbox?: boolean;
  }) => void;
  changeInput?: (value: string, code: string) => void;
  value?: string | string[];
  code: string;
  name: string;
  errorMessage?: string;
  multiSelect?: boolean;
}

export const TableInputFilter: FC<IProps> = ({
  multiSelect,
  changeInput,
  changeFilter,
  placeholder,
  items,
  value,
  code,
  errorMessage,
  mainFilter,
  className
}) => {
  const commonInputClasses = commonInputStyles();
  const styles = useStyles();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [multiFilterState, setMultiFilterState] = useState<IMultiFilterState>(
    initialMultiFilterState
  );
  const isAutocomplete = useSelector(getAutocomplete);

  const handleMultiChange = (
    event: ChangeEvent<{}>,
    multiItem: string | string[] | (string | string[])[] | null
  ) => {
    if (multiItem && Array.isArray(multiItem)) {
      setMultiFilterState(state => ({ ...state, [code]: multiItem.flat() }));
    }
  };

  const onClickSearch = () => {
    changeFilter({ code, item: multiFilterState[code] });
  };

  const handleChange = (
    _: ChangeEvent<{}>,
    item: string | string[] | (string | string[])[] | null
  ) => {
    changeFilter({ code, item });
  };

  const handleChangeInput = (_: ChangeEvent<{}>, inputValue: string) =>
    changeInput &&
    !exceptionFields.includes(code) &&
    changeInput(inputValue, code);

  const withoutRepeat = (itemsArr: string[], existArr: string[]) => {
    return itemsArr.filter(id => !existArr.includes(id));
  };

  return (
    <>
      <FormControl
        variant='outlined'
        classes={{
          root: `${commonInputClasses.input} ${
            multiSelect
              ? commonInputClasses.multiInputFilter
              : commonInputClasses.soloInput
          } ${styles.search}`
        }}
      >
        <Autocomplete
          id={code}
          multiple={multiSelect}
          limitTags={1}
          size='small'
          options={
            items &&
            ((!mainFilter &&
              multiSelect &&
              withoutRepeat(items, multiFilterState[code])) ||
              items)
          }
          autoHighlight
          disableCloseOnSelect={!!multiSelect}
          value={!mainFilter && multiSelect ? multiFilterState[code] : value}
          onChange={
            !mainFilter && multiSelect ? handleMultiChange : handleChange
          }
          onInputChange={handleChangeInput}
          getOptionLabel={option => option as string}
          renderOption={(option, { selected }) =>
            multiSelect ? (
              <>
                <Checkbox className={styles.checkbox} checked={selected} />
                {option}
              </>
            ) : (
              <>{option}</>
            )
          }
          renderInput={params => (
            <div className={styles.searchWrap}>
              <TextField
                label={placeholder}
                className={className || styles.input}
                {...params}
                id={code}
                name={code}
                variant='outlined'
                error={!!errorMessage}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment:
                    isAutocomplete && isFocused ? (
                      <>
                        {params.InputProps.endAdornment}
                        <CircularProgress
                          color='secondary'
                          size={20}
                          style={{ marginRight: mainFilter ? 35 : 0 }}
                        />
                      </>
                    ) : (
                      params.InputProps.endAdornment
                    )
                }}
              />
              {!mainFilter && multiSelect && (
                <CommonButton
                  text='Search'
                  color='yellow'
                  disabled={!multiFilterState[code].length}
                  onClickHandler={onClickSearch}
                />
              )}
            </div>
          )}
        />
      </FormControl>
      {errorMessage && (
        <Box className={commonInputClasses.error}>{errorMessage}</Box>
      )}
    </>
  );
};
