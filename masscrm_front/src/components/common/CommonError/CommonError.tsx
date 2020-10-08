import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getErrorSelector } from 'src/selectors';
import { CommonAlert } from '../CommonAlert';

export const CommonError: FC = () => {
  const notification = useSelector(getErrorSelector);
  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    notification && setOpen(true);
  }, [notification]);

  return (
    <CommonAlert
      open={open}
      onClose={handleToggle}
      errorMessage={notification || ''}
      type='error'
    />
  );
};
