import React, { FC, useCallback } from 'react';
import { ShowAll } from 'src/components/common/ShowAll';
import { Popover } from '@material-ui/core';

export const ShowMoreInformation: FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = useCallback(
    event => setAnchorEl(anchorEl ? null : event.currentTarget),
    [setAnchorEl, anchorEl]
  );

  return (
    <>
      <ShowAll
        onClick={handleClick}
        isOpen={Boolean(anchorEl)}
        title={anchorEl ? 'Hide' : 'Show more'}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {anchorEl && children}
      </Popover>
    </>
  );
};
