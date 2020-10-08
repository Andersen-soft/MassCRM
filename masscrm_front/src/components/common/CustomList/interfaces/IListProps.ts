import { INotification, INotificationPayload } from '../../../../interfaces';

export interface IListProps {
  getResult?: (type: string, id: number, payload: INotificationPayload) => void;
  list: Array<INotification>;
}
