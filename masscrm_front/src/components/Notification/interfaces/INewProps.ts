import { INotification, INotificationPayload } from '../../../interfaces';

export interface INewProps {
  getResult?: (type: string, id: number, payload: INotificationPayload) => void;
  list: Array<INotification>;
}
