import React, { FC, useCallback, useState } from 'react';
import { ListItemText } from '@material-ui/core';
import { CityModal } from '../../../../../common/CityModal';

export const AddCityModal: FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    setOpen(val => !val);
  }, [setOpen]);

  return (
    <>
      <ListItemText primary='Add city' onClick={handleToggleModal} />
      <CityModal handleClose={handleToggleModal} open={open} />
    </>
  );
};
