import React, {
  ChangeEvent,
  FC,
  useMemo,
  useCallback,
  useState,
  useEffect
} from 'react';
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
  freeSolo = true,
  onBlur,
  onFocus,
  multi
}) => {
  const style = inputStyle();
  const classes = searchStyle();
  const rootClasses = useMemo(
    () => ({
      root: `${style.input} ${multi ? style.multiInputForm : style.soloInput} ${
        classes.search
      } ${required && classes.required} ${className}`
    }),
    [className, classes.required, classes.search, required, style.input]
  );

  const [valueState, setValueState] = useState<
    string | ISearchItem | (string | ISearchItem)[] | null
  >(value || '');

  const [inputValueState, setInputValueState] = useState<
    string | ISearchItem | (string | ISearchItem)[] | null
  >(value || '');

  useEffect(() => {
    if (!value) {
      setValueState('');
      setInputValueState('');
    }
    if (multi && Array.isArray(value) && !value.length) {
      setValueState([]);
      setInputValueState('');
    }
  }, [value]);

  const handleChange = (event: ChangeEvent<{}>, val: string) => {
    setInputValueState(val);
    !multi && onChange(val);
  };

  const handleChangeInput = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    !multi && onChange(target.value);
  };

  const handleSelect = (
    event: ChangeEvent<{}>,
    val: string | ISearchItem | (string | ISearchItem)[] | null
  ) => {
    setValueState(val);
    onChange(val);
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
          multiple={multi}
          limitTags={1}
          size='small'
          freeSolo={freeSolo}
          value={Array.isArray(value) && value.length ? value : valueState}
          inputValue={inputValueState as string}
          onInputChange={handleChange}
          onChange={handleSelect}
          getOptionSelected={handleGetOptionSelected}
          getOptionLabel={handleGetOptionLabel}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          blurOnSelect={!multi}
          openOnFocus={!multi}
          disableCloseOnSelect={multi}
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
