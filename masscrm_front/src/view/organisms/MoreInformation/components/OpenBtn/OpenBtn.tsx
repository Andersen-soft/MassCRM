import React, { FC, MouseEvent } from 'react';
import { MoreVert } from '@material-ui/icons';
import { CommonIcon } from 'src/view/atoms';
import { useStyles } from './OpenBtn.styles';

interface IProps {
  handleClick: (event: MouseEvent<HTMLElement>) => void;
  icon: FC;
  anchorEl: HTMLElement | null;
}

export const OpenBtn: FC<IProps> = ({ handleClick, icon, anchorEl }) => {
  const styles = useStyles();

  return (
    <button
      className={styles.moreBtn}
      type='button'
      onClick={handleClick}
      data-testid='notification_btn'
    >
      <CommonIcon IconComponent={icon || MoreVert} isActive={!!anchorEl} />
    </button>
  );
};
