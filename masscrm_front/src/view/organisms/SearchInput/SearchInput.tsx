import React, {
  FC,
  useMemo,
  useCallback,
  useState,
  useEffect,
  ChangeEvent
} from 'react';
import { FormControl, TextField, Box } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search } from '@material-ui/icons';
import { CommonButton } from 'src/view/atoms';
import { ISearchItem } from 'src/interfaces';
import { commonInputStyles } from 'src/styles';
import { AddDialog } from './components';
import { useStyles } from './SearchInput.styles';

interface IProps {
  width?: string;
  placeholder: string;
  items: (string | ISearchItem)[];
  onChange: Function;
  onSelect?: Function;
  value?: string | ISearchItem;
  name?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputValue?: string;
  freeSolo?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  multi?: boolean;
  autoFocus?: string;
  createNewIndustry?: Function;
  isScrollForm?: boolean;
  isFieldMatching?: boolean;
}

export const SearchInput: FC<IProps> = ({
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
  className = '',
  freeSolo = true,
  onBlur,
  onFocus,
  multi,
  inputValue,
  autoFocus,
  isScrollForm,
  isFieldMatching
}) => {
  const commonInputClasses = commonInputStyles();
  const styles = useStyles();

  const rootClasses = useMemo(
    () => ({
      root: `${commonInputClasses.input} ${styles.search} 
      ${
        multi ? commonInputClasses.multiInputForm : commonInputClasses.soloInput
      } 
      ${required ? styles.required : ''} ${className}`
    }),
    [
      className,
      styles.required,
      styles.search,
      styles.paper,
      required,
      commonInputClasses.input
    ]
  );

  const isIndustry: boolean = name === 'industry';

  const [valueState, setValueState] = useState<
    string | ISearchItem | (string | ISearchItem)[] | null
  >(value || '');

  const [inputValueState, setInputValueState] = useState<
    string | ISearchItem | (string | ISearchItem)[] | null
  >(value || '');

  const [showButton, setShowButton] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleSetOpen = () => setShowButton(prev => !prev);

  useEffect(() => {
    if (!value) {
      setValueState('');
      setInputValueState('');
    }
    if (value && !multi) {
      setInputValueState(value);
    }
    if (multi && Array.isArray(value) && !value.length) {
      setValueState([]);
      setInputValueState('');
    }
  }, [value]);

  const handleChange = (_: ChangeEvent<{}>, val: string) => {
    setInputValueState(val);
    !multi && onChange(val);
  };

  const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    !multi && onChange(target.value);
  };

  const handleSelect = (
    _: ChangeEvent<{}>,
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

  const handleSetOpenDialog = () => setOpenDialog(prev => !prev);

  const handleCreateNewIndustry = useCallback(
    (industryValue: string[]) => {
      onChange(industryValue);
    },
    [valueState, value]
  );

  const getInputValue = () => {
    if (inputValue) {
      return inputValue;
    }
    if (Array.isArray(value) || isFieldMatching) {
      return '';
    }
    return inputValueState as string;
  };

  return (
    <>
      <FormControl style={{ width }} variant='outlined' classes={rootClasses}>
        <Autocomplete
          id={name}
          classes={{ paper: isIndustry ? styles.paper : '' }}
          options={items}
          multiple={multi}
          limitTags={1}
          size='small'
          freeSolo={freeSolo}
          value={Array.isArray(value) && value.length ? value : valueState}
          inputValue={getInputValue()}
          onInputChange={handleChange}
          onChange={handleSelect}
          getOptionSelected={handleGetOptionSelected}
          getOptionLabel={handleGetOptionLabel}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          onClose={handleSetOpen}
          onOpen={handleSetOpen}
          blurOnSelect={!multi}
          filterOptions={options => options}
          openOnFocus={!multi}
          disableCloseOnSelect={multi}
          renderInput={params => (
            <div className={styles.searchWrap}>
              <TextField
                {...params}
                id={name}
                name={name}
                label={placeholder}
                variant='outlined'
                error={!!errorMessage}
                helperText={isScrollForm && errorMessage}
                onChange={handleChangeInput}
                autoFocus={!!(autoFocus && autoFocus === name)}
              />
              {isIndustry && showButton && (
                <div className={styles.addButtonBlock}>
                  <CommonButton
                    text='Add new industry'
                    color='yellow'
                    onClickHandler={handleSetOpenDialog}
                  />
                </div>
              )}
              <Search
                className={`${styles.searchIcon} search-icon ${disabled &&
                  styles.disabledIcon}`}
              />
            </div>
          )}
        />
        {isIndustry && (
          <AddDialog
            name={name}
            openDialog={openDialog}
            handleSetOpenDialog={handleSetOpenDialog}
            placeholder={placeholder}
            className={rootClasses}
            handleSubmitAction={handleCreateNewIndustry}
            industries={items as string[]}
            existValue={(value as (string | ISearchItem)[] | undefined) || []}
          />
        )}
      </FormControl>
      {errorMessage && !isScrollForm && (
        <Box className={commonInputClasses.error}>{errorMessage}</Box>
      )}
    </>
  );
};
