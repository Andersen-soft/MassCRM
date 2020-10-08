import React, { FC, MouseEvent, ReactNode, useMemo, useState } from 'react';
import { styleNames } from 'src/services';
import { Popover } from '@material-ui/core';
import { ShowAll } from 'src/components/common/ShowAll';
import { STR_LENGTH } from 'src/constants';
import style from '../cell.scss';

const sn = styleNames(style);

interface IShowAllTD {
  TD?: ReactNode;
  value?: string | Array<string>;
}

export const ShowAllTD: FC<IShowAllTD> = ({ TD, value }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openText = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const closeText = () => setAnchorEl(null);

  const contentTD = useMemo(() => {
    if (Array.isArray(value)) {
      return (
        <>
          {value.map(name => (
            <p key={name}>{name}</p>
          ))}
        </>
      );
    }

    if (TD) return TD;

    return value;
  }, [TD, value]);

  return (
    <div className={sn('comment-td')}>
      <div className={sn('comment-td_content')}>
        {Array.isArray(value) ? value[0] : value}
      </div>
      {value &&
        ((Array.isArray(value) && value.length > 1) ||
          (!Array.isArray(value) && value.length > STR_LENGTH)) && (
          <ShowAll
            onClick={anchorEl ? closeText : openText}
            isOpen={!!anchorEl}
          />
        )}
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
        <div className={sn('comment-edit_content')}>{contentTD}</div>
      </Popover>
    </div>
  );
};
