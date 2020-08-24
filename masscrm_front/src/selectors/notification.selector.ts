import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';

export const getNotification = createSelector(
  (state: IStoreState) => state.notification.notification,
  notification => notification
);
