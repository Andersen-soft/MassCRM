import React, { FC, useState } from 'react';
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
import { inputStyle } from 'src/styles/CommonInput.style';
import { ICommonInputProps } from './interfaces';

export const CommonInput: FC<InputProps & ICommonInputProps> = ({
  width,
  type,
  value,
  placeholder,
  required,
  isValid,
  errorMessage,
  disabled,
  onChangeValue,
  id,
  name,
  autoFocus,
  endAdornment
}) => {
  const style = inputStyle();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isPassword = type === 'password';

  const onChangeVisible = () => {
    setIsVisible(visible => !visible);
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChangeValue(event);
  };

  const showMessage = () => {
    setIsVisible(visible => !visible);
  };

  return (
    <>
      <FormControl
        style={{ width: width || '230px' }}
        variant='outlined'
        classes={{
          root: `${style.input} ${errorMessage &&
            style.inputError} ${required && style.inputRequire}`
        }}
      >
        <InputLabel htmlFor={name}>{placeholder}</InputLabel>
        <OutlinedInput
          type={isPassword && isVisible ? 'text' : type}
          value={value}
          onChange={onChangeHandler}
          placeholder={placeholder}
          label={placeholder}
          inputProps={{ id: id || name }}
          required={required}
          error={!isValid}
          disabled={disabled}
          aria-describedby='component-error-text'
          endAdornment={
            endAdornment || (
              <InputAdornment position='end'>
                {isValid === false && (
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
          autoFocus={Boolean(autoFocus && autoFocus === name)}
        />
      </FormControl>
      {errorMessage && <Box className={style.error}>{errorMessage}</Box>}
    </>
  );
};
