import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { useStyles, defaultButtonStyles } from './CommonButton.styles';

interface IProps {
  text: string;
  dataTestId?: string;
  className?: string;
  color?: 'white' | 'yellow';
  size?: 'small' | 'big';
  align?: 'alignRight';
  onClickHandler?: (event?: any) => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
}

const DefaultButton = defaultButtonStyles(Button);

export const CommonButton: FC<IProps> = ({
  text,
  color,
  dataTestId,
  size,
  onClickHandler,
  disabled,
  type,
  children,
  align,
  className = ''
}) => {
  const styles = useStyles();

  return (
    <DefaultButton
      disableRipple
      className={`${styles[color || 'white']} ${styles[size || 'small']} ${
        align ? styles[align] : ''
      } ${className}`}
      onClick={onClickHandler}
      data-testid={dataTestId}
      disabled={disabled}
      type={type}
    >
      {text || children}
    </DefaultButton>
  );
};
