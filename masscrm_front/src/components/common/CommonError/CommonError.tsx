import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorSelector } from 'src/selectors';
import { setErrorHTTPRequest } from 'src/actions';
import { CommonAlert } from '../CommonAlert';

export const CommonError: FC = () => {
  const notification = useSelector(getErrorSelector);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = useCallback(() => {
    dispatch(setErrorHTTPRequest(''));
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
