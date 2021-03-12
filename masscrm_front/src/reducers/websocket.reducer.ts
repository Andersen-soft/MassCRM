import { Action, handleActions } from 'redux-actions';
import { websocketActionTypes } from 'src/actions/websocket.action';
import { IWebsocketStore } from 'src/interfaces/IWebsocket';

type S = IWebsocketStore;

const initialState: IWebsocketStore = {
  wsData: null,
  ws: null,
  importProgress: {},
  exportProgress: {}
};

export const websocketReducer = handleActions(
  {
    [websocketActionTypes.WEBSOCKET_SAVE]: (
      state: S,
      { payload }: { payload: IWebsocketStore }
    ): S => ({
      ...state,
      ws: payload.ws
    }),
    [websocketActionTypes.WEBSOCKET_IMPORT_FINISHED]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      wsData: payload
    }),
    [websocketActionTypes.WEBSOCKET_IMPORT_FAILED]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      wsData: payload
    }),
    [websocketActionTypes.WEBSOCKET_EXPORT_BLACKLIST_FINISHED]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      wsData: payload
    }),
    [websocketActionTypes.WEBSOCKET_EXPORT_BLACKLIST_FAILED]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      wsData: payload
    }),
    [websocketActionTypes.WEBSOCKET_EXPORT_CONTACT_FINISHED]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      wsData: payload
    }),
    [websocketActionTypes.WEBSOCKET_EXPORT_CONTACT_FAILED]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      wsData: payload
    }),
    [websocketActionTypes.WEBSOCKET_CLEAR_WS_DATA]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [websocketActionTypes.WEBSOCKET_IS_IN_WORK_UPDATED]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      wsData: payload
    }),
    [websocketActionTypes.WEBSOCKET_SET_EXPORT_PROGRESS_BAR]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      exportProgress: { ...state.exportProgress, ...payload }
    }),
    [websocketActionTypes.WEBSOCKET_SET_IMPORT_PROGRESS_BAR]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      importProgress: { ...state.importProgress, ...payload }
    }),
    [websocketActionTypes.WEBSOCKET_CLEAR_PROGRESS_BAR]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
