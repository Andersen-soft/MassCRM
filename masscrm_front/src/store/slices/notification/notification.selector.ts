import { createSelector } from 'reselect';
import { IStoreState, INotificationStore } from 'src/interfaces';

export const getNotificationSelector = createSelector(
  ({ notification: { notification } }: IStoreState) => notification,
  notification => notification
);

export const getNotificationList = createSelector(
  ({ notification: { data } }: INotificationStore) => data,
  data => data
);
