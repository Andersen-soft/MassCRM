import React, { FC, MouseEvent, useState } from 'react';
import { Popover } from '@material-ui/core';
import { ShowAll } from 'src/view/molecules';
import { BOTTOM, CENTER, getPositionConfig, TOP } from 'src/constants';
import { useStyles } from './Popup.styles';

interface IProps {
  value: string[];
  linkItemMap: (val: string) => void;
  isLink: boolean;
}

export const Popup: FC<IProps> = ({ value, linkItemMap, isLink }) => {
  const styles = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openText = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : currentTarget);
  };

  const closeText = () => setAnchorEl(null);

  return (
    <>
      <ShowAll onClick={anchorEl ? closeText : openText} isOpen={!!anchorEl} />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={closeText}
        anchorOrigin={getPositionConfig(BOTTOM, CENTER)}
        transformOrigin={getPositionConfig(TOP, CENTER)}
      >
        <div className={styles.listTDWrap}>
          {value?.map((item: string) =>
            isLink ? linkItemMap(item) : <div key={item}>{item}</div>
          )}
        </div>
      </Popover>
    </>
  );
};
