import React, { FC } from 'react';
import { Box, SvgIconProps, IconButton } from '@material-ui/core';
import { useStyles } from './CommonIcon.styles';

interface IProps {
  IconComponent: FC<SvgIconProps>;
  resetFilter?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  dataTestId?: string;
}
export const CommonIcon: FC<IProps & SvgIconProps> = ({
  name,
  IconComponent,
  isActive,
  disabled,
  dataTestId,
  ...props
}) => {
  const styles = useStyles();

  if (disabled) {
    return (
      <Box className={styles.box} data-testid={dataTestId}>
        <IconButton className={styles.iconBtn} disabled>
          <IconComponent
            {...props}
            classes={{
              root: `${styles.icon}`
            }}
          />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box className={styles.box} data-testid={dataTestId}>
      <IconComponent
        {...props}
        classes={{
          root: `${styles.icon} ${isActive && styles.iconActive}`
        }}
      />
    </Box>
  );
};
