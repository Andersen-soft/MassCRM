import { ActionFunctionAny, Action } from 'redux-actions';

export interface IWebsocketActions {
  [key: string]: ActionFunctionAny<Action<any>>;
  importResultAction: ActionFunctionAny<Action<any>>;
  connectAction: ActionFunctionAny<Action<any>>;
  openAction: ActionFunctionAny<Action<any>>;
  closeAction: ActionFunctionAny<Action<any>>;
  saveAction: ActionFunctionAny<Action<any>>;
  sendAction: ActionFunctionAny<Action<any>>;
  disconnectAction: ActionFunctionAny<Action<any>>;
  importFinished: ActionFunctionAny<Action<any>>;
  exportBlacklistFinished: ActionFunctionAny<Action<any>>;
  exportProgressBar: ActionFunctionAny<Action<any>>;
  importProgressBar: ActionFunctionAny<Action<any>>;
}

export interface IWebsocketpackage {
  type: string;
  data: {
    [key: string]: any;
  };
}

export interface IProgress {
  [key: string]: string | number;
}

export interface IWSProgressBar {
  id: number;
  created_at: Date | string;
  percent: number;
}

export interface IWebsocketData {
  created_at?: string | Date;
  file_path?: string;
  message?: string;
  operation_id?: null | number | string;
  type?: string;
}

export interface IWebsocketStore {
  wsData: null | IWebsocketData;
  ws: null | WebSocket;
  importProgress: { [key: string]: IWSProgressBar };
  exportProgress: { [key: string]: IWSProgressBar };
}
