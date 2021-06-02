import React, { FC } from 'react';
import { SvgIconProps } from '@material-ui/core';
import { CommonIcon } from 'src/view/atoms';
import { useStyles } from './LabelIconGroup.styles';

interface IProps {
  label: string | number;
  count: string | number;
  icon: FC<SvgIconProps>;
  isActive?: boolean;
  className?: string;
  dataTestId?: string;
}

export const LabelIconGroup: FC<IProps> = ({
  label,
  count,
  icon,
  isActive,
  dataTestId,
  className = ''
}) => {
  const styles = useStyles();

  return (
    <div className={`${styles.labelIcon} ${className}`}>
      <span className={styles.labelIconText}>{label}:</span>
      <span className={styles.labelIconCount}>{count}</span>
      <CommonIcon
        IconComponent={icon}
        isActive={isActive}
        dataTestId={dataTestId}
      />
    </div>
  );
};
