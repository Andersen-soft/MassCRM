import React, { FC, MouseEvent, useState } from 'react';
import { Popover } from '@material-ui/core';
import { ShowAll } from 'src/components/common';
import { styleNames } from 'src/services';
import style from '../cell.scss';

const sn = styleNames(style);

export const ContactPopup: FC<{
  value: Array<string>;
  linkItemMap: (val: string) => void;
}> = ({ value, linkItemMap }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openText = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const closeText = () => setAnchorEl(null);

  return (
    <>
      <ShowAll onClick={anchorEl ? closeText : openText} isOpen={!!anchorEl} />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={closeText}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <div className={sn('list-td_wrap')}>{value?.map(linkItemMap)}</div>
      </Popover>
    </>
  );
};
