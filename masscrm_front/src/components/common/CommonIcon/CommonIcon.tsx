import React, { FC } from 'react';
import { Box, SvgIconProps, IconButton } from '@material-ui/core';
import { iconStyle } from './CommonIcon.style';
import { ICommonIconProps } from './interfaces';

export const CommonIcon: FC<ICommonIconProps & SvgIconProps> = ({
  name,
  IconComponent,
  isActive,
  disabled,
  dataTestId,
  ...props
}) => {
  const style = iconStyle();

  if (disabled) {
    return (
      <Box className={style.box} data-testid={dataTestId}>
        <IconButton className={style.iconBtn} disabled>
          <IconComponent
            {...props}
            classes={{
              root: `${style.icon}`
            }}
          />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box className={style.box} data-testid={dataTestId}>
      <IconComponent
        {...props}
        classes={{
          root: `${style.icon} ${props?.onClick &&
            style.iconActive} ${isActive && style.iconActive}`
        }}
      />
    </Box>
  );
};
