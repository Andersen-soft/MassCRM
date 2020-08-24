import React, { FC, MouseEvent, useState } from 'react';
import { Popover } from '@material-ui/core';
import { ShowAll } from 'src/components/common';
import { styleNames } from 'src/services';
import style from './CommentCell.scss';

const sn = styleNames(style);

export const CommentTD: FC<{ value?: string }> = ({ value }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openText = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const closeText = () => setAnchorEl(null);
  return (
    <div className={sn('comment-td')}>
      <div className={sn('comment-td_content')}>{value}</div>
      {value && value?.length > 50 && (
        <>
          <ShowAll
            onClick={anchorEl ? closeText : openText}
            isOpen={!!anchorEl}
          />
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
            <div className={sn('comment-edit_content')}>{value}</div>
          </Popover>
        </>
      )}
    </div>
  );
};
