import React, { FC } from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography
} from '@material-ui/core';
import { format, parseJSON } from 'date-fns';
import { INotification, INotificationPayload } from 'src/interfaces';
import { DD_MMM_P } from 'src/constants';
import { NOTIFICATION_TYPES } from './constants';
import { useStyles } from './CustomList.styles';

interface IProps {
  getResult?: (type: string, id: number, payload: INotificationPayload) => void;
  list: INotification[];
}

export const CustomList: FC<IProps> = ({ list, getResult }) => {
  const styles = useStyles();

  const handleClick = (
    type: string,
    id: number,
    payload: INotificationPayload
  ) => () => {
    getResult && getResult(type, id, payload);
  };

  return (
    <List
      data-testid='list'
      className={
        list?.length > 3 ? `${styles.root} ${styles.rootOver}` : styles.root
      }
    >
      {list?.map(({ id, payload, type }: INotification) => (
        <div key={id}>
          <ListItem data-testid='notification_list_item'>
            <ListItemText
              className={
                payload.new
                  ? styles.newNotification
                  : styles.historyNotification
              }
              primary={payload.message}
              secondary={
                <Typography
                  component='span'
                  variant='body2'
                  className={styles.typography}
                >
                  <span
                    className={styles.date}
                    data-testid={`date_listItem_${id}`}
                  >
                    {format(parseJSON(payload.created_at), DD_MMM_P)}
                  </span>
                  <button
                    data-testid={`btn_${type}_${id}`}
                    className={styles.button}
                    type='button'
                    onClick={handleClick(type, id, payload)}
                  >
                    {NOTIFICATION_TYPES[type]}
                  </button>
                </Typography>
              }
            />
          </ListItem>
          <Divider variant='middle' component='li' />
        </div>
      ))}
    </List>
  );
};
