import React, { FC, useMemo } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { MoreInformation } from 'src/components/common/MoreInformation';
import { AddContactModal } from '../AddContactModal';
import { AddCityModal } from '../AddCityModal/AddCityModal';

export const KebabMenu: FC<{ isFullFunctionality: boolean }> = ({
  isFullFunctionality
}) => {
  const popperInfo = useMemo(
    () => (
      <List component='nav' aria-label='secondary mailbox folders'>
        {isFullFunctionality && (
          <>
            <ListItem button>
              <AddContactModal />
            </ListItem>
            <ListItem button>
              <AddCityModal />
            </ListItem>
            <ListItem href='/export' button component='a'>
              <ListItemText primary='Export details' />
            </ListItem>
          </>
        )}
        <ListItem href='/import' button component='a'>
          <ListItemText primary='Import details' />
        </ListItem>
      </List>
    ),
    []
  );
  return <MoreInformation popperInfo={popperInfo} />;
};
