import React, { ChangeEvent, FC, useState } from 'react';
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputProps,
  Box
} from '@material-ui/core';
import { ErrorOutline, Visibility, VisibilityOff } from '@material-ui/icons';
import { ICommonInputProps } from 'src/interfaces';
import { commonInputStyles } from 'src/styles';

export const CommonInput: FC<InputProps & ICommonInputProps> = ({
  width,
  type,
  value,
  placeholder,
  required,
  isValid = true,
  errorMessage,
  disabled,
  onChangeValue,
  id,
  name,
  autoFocus,
  endAdornment,
  isDoubleClick
}) => {
  const commonInputClasses = commonInputStyles();

  const [isVisible, setIsVisible] = useState(false);

  const isPassword = type === 'password';

  const onChangeVisible = () => {
    setIsVisible(visible => !visible);
  };

  const onChangeHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChangeValue(event);
  };

  const showMessage = () => {
    // TODO: изменить реализацию, она такая же как в onChangeVisible
    setIsVisible(visible => !visible);
  };

  return (
    <>
      <FormControl
        style={{ width: width || '230px' }}
        variant='outlined'
        classes={{
          root: `${commonInputClasses.input} ${errorMessage &&
            commonInputClasses.inputError} ${required &&
            commonInputClasses.inputRequire}`
        }}
      >
        <InputLabel htmlFor={name}>{placeholder}</InputLabel>
        <OutlinedInput
          type={isPassword && isVisible ? 'text' : type}
          value={value}
          onChange={onChangeHandler}
          label={placeholder}
          inputProps={{ id: id || name }}
          required={required}
          error={!isValid}
          disabled={disabled}
          aria-describedby='component-error-text'
          endAdornment={
            endAdornment || (
              <InputAdornment position='end'>
                {!isValid && (
                  <IconButton
                    aria-label={errorMessage}
                    onClick={showMessage}
                    onMouseDown={() => false}
                    edge='end'
                  >
                    <ErrorOutline color='error' />
                  </IconButton>
                )}
                {isPassword && (
                  <IconButton
                    aria-label={errorMessage}
                    onClick={onChangeVisible}
                    onMouseDown={() => false}
                    edge='end'
                  >
                    {!isVisible && <Visibility />}
                    {isVisible && <VisibilityOff />}
                  </IconButton>
                )}
              </InputAdornment>
            )
          }
          labelWidth={70}
          autoFocus={!!(autoFocus && autoFocus === name)}
        />
      </FormControl>
      {errorMessage && (
        <Box
          className={
            isDoubleClick
              ? commonInputClasses.error
              : `${commonInputClasses.error} ${commonInputClasses.positionAbsolute}`
          }
        >
          {errorMessage}
        </Box>
      )}
    </>
  );
};
