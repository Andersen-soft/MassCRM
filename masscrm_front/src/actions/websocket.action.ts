import { createAction } from 'redux-actions';
import { IWebsocketActions } from 'src/interfaces/IWebsocket';
import { Dispatch } from 'redux';

export const websocketActionTypes = {
  WEBSOCKET_INIT: 'WEBSOCKET_INIT',
  WEBSOCKET_IMPORT_RESULT: 'WEBSOCKET_IMPORT_RESULT',
  WEBSOCKET_CONNECT: 'WEBSOCKET_CONNECT',
  WEBSOCKET_OPEN: 'WEBSOCKET_OPEN',
  WEBSOCKET_CLOSE: 'WEBSOCKET_CLOSE',
  WEBSOCKET_SAVE: 'WEBSOCKET_SAVE',
  WEBSOCKET_SEND: 'WEBSOCKET_SEND',
  WEBSOCKET_DISCONNECT: 'WEBSOCKET_DISCONNECT',
  WEBSOCKET_INIT_RESULT: 'WEBSOCKET_INIT_RESULT',
  WEBSOCKET_IMPORT_FINISHED: 'WEBSOCKET_IMPORT_FINISHED',
  WEBSOCKET_EXPORT_BLACKLIST_FINISHED: 'WEBSOCKET_EXPORT_BLACKLIST_FINISHED',
  WEBSOCKET_EXPORT_CONTACT_FINISHED: 'WEBSOCKET_EXPORT_CONTACT_FINISHED',
  WEBSOCKET_CLEAR_WS_DATA: 'WEBSOCKET_CLEAR_WS_DATA'
};

// TODO: make correct types
export const websocketPagckageTypes: {
  [key: string]: string;
} = {
  // example
  import_finished: 'importFinished',
  export_contacts_finished: 'exportContactFinished',
  export_blacklist_finished: 'exportBlacklistFinished',
  initResult: 'initResult'
};

export const websocketActions: IWebsocketActions = {
  importResultAction: createAction(
    websocketActionTypes.WEBSOCKET_IMPORT_RESULT
  ),
  connectAction: createAction(websocketActionTypes.WEBSOCKET_CONNECT),
  openAction: createAction(websocketActionTypes.WEBSOCKET_OPEN),
  closeAction: createAction(websocketActionTypes.WEBSOCKET_CLOSE),
  saveAction: createAction(websocketActionTypes.WEBSOCKET_SAVE),
  sendAction: createAction(websocketActionTypes.WEBSOCKET_SEND),
  disconnectAction: createAction(websocketActionTypes.WEBSOCKET_DISCONNECT),
  initResult: createAction(websocketActionTypes.WEBSOCKET_INIT_RESULT),
  importFinished: createAction(websocketActionTypes.WEBSOCKET_IMPORT_FINISHED),
  exportContactFinished: createAction(
    websocketActionTypes.WEBSOCKET_EXPORT_CONTACT_FINISHED
  ),
  exportBlacklistFinished: createAction(
    websocketActionTypes.WEBSOCKET_EXPORT_BLACKLIST_FINISHED
  )
};

const clearWebsocketDataAction = createAction(
  websocketActionTypes.WEBSOCKET_CLEAR_WS_DATA
);

export const clearWebsocketData = (wsData: null) => (dispatch: Dispatch) =>
  dispatch(clearWebsocketDataAction({ wsData }));
