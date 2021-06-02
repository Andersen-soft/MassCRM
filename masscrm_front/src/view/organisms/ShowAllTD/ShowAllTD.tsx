import React, { FC, MouseEvent, ReactNode, useMemo, useState } from 'react';
import { Popover } from '@material-ui/core';
import { ShowAll } from 'src/view/molecules';
import { BOTTOM, CENTER, getPositionConfig, TOP } from 'src/constants';
import { STR_LENGTH } from './constants';
import { useStyles } from './ShowAllTD.styles';

interface IProps {
  TD?: ReactNode;
  value?: string | string[];
}

export const ShowAllTD: FC<IProps> = ({ TD, value }) => {
  const styles = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openText = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : currentTarget);
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
    <div className={styles.commentTD}>
      <div className={styles.commentTDContent}>
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
        anchorOrigin={getPositionConfig(BOTTOM, CENTER)}
        transformOrigin={getPositionConfig(TOP, CENTER)}
      >
        <div className={styles.commentEditContent}>{contentTD}</div>
      </Popover>
    </div>
  );
};
