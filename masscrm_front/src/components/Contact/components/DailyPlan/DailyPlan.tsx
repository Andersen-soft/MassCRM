import React, { FC, useEffect } from 'react';
import { styleNames } from 'src/services';
import { PermIdentity } from '@material-ui/icons';
import { LabelIconGroup } from 'src/components/common';
import { useDispatch, useSelector } from 'react-redux';
import { getContactPlan } from 'src/actions';
import { getContactsPlan } from 'src/selectors';
import style from '../../Contact.scss';

const sn = styleNames(style);

export const DailyPlan: FC = () => {
  const dispatch = useDispatch();
  const complete = useSelector(getContactsPlan);

  useEffect(() => {
    dispatch(getContactPlan());
  }, []);

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
