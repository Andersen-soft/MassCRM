import React, { FC, useMemo } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { MoreInformation } from 'src/components/common/MoreInformation';
import { AddContactModal } from '../AddContactModal';

export const KebabMenu: FC = () => {
  const popperInfo = useMemo(
    () => (
      <List component='nav' aria-label='secondary mailbox folders'>
        <ListItem button>
          <AddContactModal />
        </ListItem>
        <ListItem href='/export' button component='a'>
          <ListItemText primary='Export details' />
        </ListItem>
      </List>
    ),
    []
  );
  return <MoreInformation popperInfo={popperInfo} />;
};
