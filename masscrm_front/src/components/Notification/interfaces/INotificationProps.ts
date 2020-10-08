import { INotification, INotificationPayload } from '../../../interfaces';

export interface INotificationProps {
  getResult?: (type: string, id: number, payload: INotificationPayload) => void;
  newNotification: Array<INotification>;
  historyNotification: Array<INotification>;
}
