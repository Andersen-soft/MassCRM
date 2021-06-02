import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorSelector, setErrorHTTPRequest } from 'src/store/slices';
import { CommonAlert } from 'src/view/atoms';

export const CommonError = () => {
  const notification = useSelector(getErrorSelector);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

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
      errorMessage={notification}
      type='error'
    />
  );
};
