import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { IStoreState, IWebsocketActions } from 'src/interfaces';

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
  WEBSOCKET_IMPORT_FAILED: 'WEBSOCKET_IMPORT_FAILED',
  WEBSOCKET_EXPORT_BLACKLIST_FINISHED: 'WEBSOCKET_EXPORT_BLACKLIST_FINISHED',
  WEBSOCKET_EXPORT_BLACKLIST_FAILED: 'WEBSOCKET_EXPORT_BLACKLIST_FAILED',
  WEBSOCKET_EXPORT_CONTACT_FINISHED: 'WEBSOCKET_EXPORT_CONTACT_FINISHED',
  WEBSOCKET_EXPORT_CONTACT_FAILED: 'WEBSOCKET_EXPORT_CONTACT_FAILED',
  WEBSOCKET_CLEAR_WS_DATA: 'WEBSOCKET_CLEAR_WS_DATA',
  WEBSOCKET_IS_IN_WORK_UPDATED: 'WEBSOCKET_IS_IN_WORK_UPDATED',
  WEBSOCKET_SET_EXPORT_PROGRESS_BAR: 'WEBSOCKET_SET_EXPORT_PROGRESS_BAR',
  WEBSOCKET_SET_IMPORT_PROGRESS_BAR: 'WEBSOCKET_SET_IMPORT_PROGRESS_BAR',
  WEBSOCKET_CLEAR_PROGRESS_BAR: 'WEBSOCKET_CLEAR_PROGRESS_BAR'
};

export const websocketPagckageTypes: {
  [key: string]: string;
} = {
  import_finished: 'importFinished',
  import_failed: 'importFailed',
  export_contacts_finished: 'exportContactFinished',
  export_contacts_failed: 'exportContactFailed',
  export_blacklist_finished: 'exportBlacklistFinished',
  export_blacklist_failed: 'exportBlacklistFailed',
  export_progress_bar: 'exportProgressBar',
  import_progress_bar: 'importProgressBar',
  is_in_work_updated: 'isInWorkUpdated',
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
  importFailed: createAction(websocketActionTypes.WEBSOCKET_IMPORT_FAILED),
  exportContactFinished: createAction(
    websocketActionTypes.WEBSOCKET_EXPORT_CONTACT_FINISHED
  ),
  exportContactFailed: createAction(
    websocketActionTypes.WEBSOCKET_EXPORT_CONTACT_FAILED
  ),
  exportBlacklistFinished: createAction(
    websocketActionTypes.WEBSOCKET_EXPORT_BLACKLIST_FINISHED
  ),
  exportBlacklistFailed: createAction(
    websocketActionTypes.WEBSOCKET_EXPORT_BLACKLIST_FAILED
  ),
  isInWorkUpdated: createAction(
    websocketActionTypes.WEBSOCKET_IS_IN_WORK_UPDATED
  ),
  exportProgressBar: createAction(
    websocketActionTypes.WEBSOCKET_SET_EXPORT_PROGRESS_BAR
  ),
  importProgressBar: createAction(
    websocketActionTypes.WEBSOCKET_SET_IMPORT_PROGRESS_BAR
  )
};

const clearWebsocketDataAction = createAction(
  websocketActionTypes.WEBSOCKET_CLEAR_WS_DATA
);

const clearWebsocketProgressBarAction = createAction(
  websocketActionTypes.WEBSOCKET_CLEAR_PROGRESS_BAR
);

export const clearWebsocketData = (wsData: null) => (dispatch: Dispatch) =>
  dispatch(clearWebsocketDataAction({ wsData }));

export const clearWebsocketProgressBar = (
  isExportTable: boolean,
  id?: number
) => (dispatch: Dispatch, state: () => IStoreState) => {
  const tableType = isExportTable ? 'exportProgress' : 'importProgress';
  const progressObject = { ...state().websocket[tableType] };
  delete progressObject[`${id}`];
  dispatch(clearWebsocketProgressBarAction({ [tableType]: progressObject }));
};
