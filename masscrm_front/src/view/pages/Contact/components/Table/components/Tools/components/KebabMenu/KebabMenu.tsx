import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { MoreInformation } from 'src/view/organisms';
import { EXPORT_PATH, IMPORT_PATH } from 'src/constants';
import { AddCityModal, AddContactModal } from './components';
import { useStyles } from './KebabMenu.styles';

interface IProps {
  isFullFunctionality: boolean;
}

export const KebabMenu: FC<IProps> = ({ isFullFunctionality }) => {
  const styles = useStyles();

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
            <ListItem button>
              <Link to={EXPORT_PATH} className={styles.kebabLink}>
                <ListItemText primary='Export details' />
              </Link>
            </ListItem>
          </>
        )}
        <ListItem button>
          <Link to={IMPORT_PATH} className={styles.kebabLink}>
            <ListItemText primary='Import details' />
          </Link>
        </ListItem>
      </List>
    ),
    []
  );
  return <MoreInformation popperInfo={popperInfo} />;
};
