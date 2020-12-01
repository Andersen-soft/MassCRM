import { INotification, INotificationPayload } from 'src/interfaces';

export interface IListProps {
  getResult?: (type: string, id: number, payload: INotificationPayload) => void;
  list: Array<INotification>;
}
