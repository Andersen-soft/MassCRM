import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { PermIdentity } from '@material-ui/icons';
import { LabelIconGroup } from 'src/components/common';
import { useSelector } from 'react-redux';
import { getContactsPlan } from 'src/selectors';
import style from '../../Contact.scss';

const sn = styleNames(style);

export const DailyPlan: FC = () => {
  const complete = useSelector(getContactsPlan);

  return (
    <div className={sn('daily-plan')}>
      <LabelIconGroup
        label='Daily plan'
        count={complete?.expected}
        icon={PermIdentity}
      />
      <LabelIconGroup
        label='Complete'
        count={complete?.count}
        icon={PermIdentity}
      />
    </div>
  );
};
