import { handleActions } from 'redux-actions';
import { websocketActionTypes } from 'src/actions/websocket.action';
import { IWebsocketStore } from 'src/interfaces/IWebsocket';

type S = IWebsocketStore;

const initialState: IWebsocketStore = {
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
    })
  },
  initialState
);
