import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';
import parseJSON from 'date-fns/parseJSON';
import { useStyles } from './CustomList.styles';
import { IListProps } from './interfaces';
import { INotification, INotificationPayload } from '../../../interfaces';

interface INotificationTypes {
  [key: string]: string;
}

const NOTIFICATION_TYPES: INotificationTypes = {
  export_contacts_finished: 'Download',
  export_blacklist_finished: 'Download',
  import_finished: 'View result',
  is_in_work_updated: 'Update table'
};

export const CustomList = ({ list, getResult }: IListProps) => {
  const classes = useStyles();

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
        list?.length > 3 ? `${classes.root} ${classes.rootOver}` : classes.root
      }
    >
      {list?.map(({ id, payload, type }: INotification) => (
        <div key={id}>
          <ListItem data-testid='notification_list_item'>
            <ListItemText
              className={
                payload.new
                  ? classes.newNotification
                  : classes.historyNotification
              }
              primary={payload.message}
              secondary={
                <Typography
                  component='span'
                  variant='body2'
                  className={classes.typography}
                >
                  <span
                    className={classes.date}
                    data-testid={`date_listItem_${id}`}
                  >
                    {format(parseJSON(payload.created_at), 'dd MMM, p')}
                  </span>
                  <button
                    data-testid={`btn_${type}_${id}`}
                    className={classes.button}
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
