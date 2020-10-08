import { INotification, INotificationPayload } from '../../../interfaces';

export interface IHistoryProps {
  getResult?: (type: string, id: number, payload: INotificationPayload) => void;
  list: Array<INotification>;
}
