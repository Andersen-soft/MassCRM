import React from 'react';
import { PermIdentity } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { getContactsPlan } from 'src/store/slices';
import { LabelIconGroup } from 'src/view/molecules';
import { useStyles } from './DailyPlan.styles';

export const DailyPlan = () => {
  const { count, expected } = useSelector(getContactsPlan);

  const styles = useStyles();

  return (
    <div className={styles.dailyPlan}>
      <LabelIconGroup label='Daily plan' count={expected} icon={PermIdentity} />
      <LabelIconGroup label='Complete' count={count} icon={PermIdentity} />
    </div>
  );
};
