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
}

export interface IWebsocketpackage {
  type: string;
  data: {
    [key: string]: any;
  };
}

export interface IWebsocketStore {
  ws: WebSocket | null;
}
