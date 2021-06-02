import React, { FC, MouseEvent, useState } from 'react';
import { Popover } from '@material-ui/core';
import { ShowAll } from 'src/view/molecules';
import { BOTTOM, CENTER, getPositionConfig, TOP } from 'src/constants';

export const ShowMoreInformation: FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : currentTarget);
  };

  const isOpen = !!anchorEl;

  return (
    <>
      <ShowAll
        onClick={handleClick}
        isOpen={isOpen}
        title={anchorEl ? 'Hide' : 'Show more'}
      />
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClick}
        anchorOrigin={getPositionConfig(BOTTOM, CENTER)}
        transformOrigin={getPositionConfig(TOP, CENTER)}
      >
        {anchorEl && children}
      </Popover>
    </>
  );
};
