import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { CommonIcon } from 'src/components/common/CommonIcon';
import style from './LabelIconGroup.scss';
import { ILabelIconGroupProps } from './interfaces';

const sn = styleNames(style);

export const LabelIconGroup: FC<ILabelIconGroupProps> = ({
  label,
  count,
  icon,
  isActive,
  className = ''
}) => {
  return (
    <div className={`${sn('label-icon')} ${className}`}>
      <span className={sn('label-icon_text')}>{label}:</span>
      <span className={sn('label-icon_count')}>{count}</span>
      <CommonIcon IconComponent={icon} isActive={isActive} />
    </div>
  );
};
