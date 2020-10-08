export interface INotificationPayload {
  created_at: Date;
  file_path: string;
  message: string;
  new: boolean;
  operation_id: number;
  updated_at: Date;
}

export interface INotification {
  id: number;
  payload: INotificationPayload;
  type: string;
}
