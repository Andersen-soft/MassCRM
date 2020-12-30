import { Action, handleActions } from 'redux-actions';
import { websocketActionTypes } from 'src/actions/websocket.action';
import { IWebsocketStore } from 'src/interfaces/IWebsocket';

type S = IWebsocketStore;

const initialState: IWebsocketStore = {
  wsData: null,
  ws: null
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
    ): S => {
      return {
        ...state,
        wsData: payload
      };
    },
    [websocketActionTypes.WEBSOCKET_EXPORT_BLACKLIST_FINISHED]: (
      state: S,
      { payload }: Action<any>
    ): S => {
      return {
        ...state,
        wsData: payload
      };
    },
    [websocketActionTypes.WEBSOCKET_EXPORT_CONTACT_FINISHED]: (
      state: S,
      { payload }: Action<any>
    ): S => {
      return {
        ...state,
        wsData: payload
      };
    },
    [websocketActionTypes.WEBSOCKET_CLEAR_WS_DATA]: (
      state: S,
      { payload }: Action<any>
    ): S => {
      return {
        ...state,
        ...payload
      };
    },
    [websocketActionTypes.WEBSOCKET_IS_IN_WORK_UPDATED]: (
      state: S,
      { payload }: Action<any>
    ): S => {
      return {
        ...state,
        wsData: payload
      };
    }
  },
  initialState
);
