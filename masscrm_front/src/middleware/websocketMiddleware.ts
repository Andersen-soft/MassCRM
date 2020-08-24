/* eslint-disable no-case-declarations */
import { Middleware, Dispatch } from 'redux';
import Cookies from 'js-cookie';
import {
  WS_FULL_CLOSE_CODE,
  WS_RECONNECT_CLOSE_CODE,
  WS_URL,
  WS_RECONNECT_DELAY,
  WS_SEND_DELAY
} from 'src/constants/websocket';
import { IWebsocketpackage } from 'src/interfaces';
import {
  websocketActions,
  websocketActionTypes,
  websocketPagckageTypes
} from 'src/actions/websocket.action';

function websocketDispatcher(dispatch: Dispatch, event: MessageEvent) {
  try {
    const { data: wsPackageData } = event;
    const { type, data }: IWebsocketpackage = JSON.parse(wsPackageData);
    const actionType = websocketPagckageTypes[type];
    const action = actionType ? websocketActions[actionType] : null;

    if (action) {
      dispatch(action(data));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
}

let closeTimeout: NodeJS.Timeout;

export const websocketMiddleware: Middleware = ({
  dispatch,
  getState
}) => next => action => {
  const {
    websocket: { ws }
  } = getState();

  switch (action.type) {
    case websocketActionTypes.WEBSOCKET_CONNECT:
      if (ws !== null) {
        ws.onclose = null;
        ws.close(WS_FULL_CLOSE_CODE);
      }

      clearTimeout(closeTimeout);

      const wsUrl = `${WS_URL}?token=${Cookies.get('token')}`;
      const websocket = new WebSocket(wsUrl);

      websocket.onopen = () => {
        dispatch(websocketActions.openAction());
      };
      websocket.onclose = (event: CloseEvent) => {
        dispatch(websocketActions.closeAction(event));
      };
      websocket.onmessage = (event: MessageEvent) =>
        websocketDispatcher(dispatch, event);
      dispatch(websocketActions.saveAction({ ws: websocket }));
      break;

    case websocketActionTypes.WEBSOCKET_CLOSE:
      if (action.payload.code !== WS_FULL_CLOSE_CODE) {
        closeTimeout = setTimeout(
          () => dispatch(websocketActions.connectAction()),
          WS_RECONNECT_DELAY
        );
      }
      break;

    case websocketActionTypes.WEBSOCKET_SEND:
      if (ws && ws.readyState === 0) {
        setTimeout(() => {
          dispatch(websocketActions.sendAction(action.payload));
        }, WS_SEND_DELAY);
      } else if (ws && ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(action.payload));
      }

      break;

    case websocketActionTypes.WEBSOCKET_DISCONNECT:
      if (ws !== null) {
        ws.close(
          action.payload.needReconnect
            ? WS_RECONNECT_CLOSE_CODE
            : WS_FULL_CLOSE_CODE
        );

        if (!action.payload.needReconnect) {
          ws.onclose = null;
        }
      }

      clearTimeout(closeTimeout);
      break;

    default:
      break;
  }

  return next(action);
};
