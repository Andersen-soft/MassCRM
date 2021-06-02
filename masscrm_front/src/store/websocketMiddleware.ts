/* eslint-disable no-case-declarations */
import { Middleware, Dispatch } from 'redux';
import Cookies from 'js-cookie';
import {
  WS_FULL_CLOSE_CODE,
  WS_RECONNECT_CLOSE_CODE,
  WS_URL,
  WS_RECONNECT_DELAY,
  WS_SEND_DELAY
} from 'src/constants';
import {
  websocketActions,
  websocketActionTypes,
  websocketPagckageTypes
} from 'src/store/slices';
import { IWebsocketpackage } from 'src/interfaces';

function websocketDispatcher(dispatch: Dispatch, event: MessageEvent) {
  try {
    const { data: wsPackageData } = event;
    const { type, data }: IWebsocketpackage = JSON.parse(wsPackageData);
    const actionType = websocketPagckageTypes[type];
    const action = actionType ? websocketActions[actionType] : null;
    const progressBarTypes: string[] = [
      'export_progress_bar',
      'import_progress_bar'
    ];
    const storageType: string = `${type.split('_')[0]}`;

    if (action && progressBarTypes.includes(type)) {
      const { id } = data;
      localStorage.setItem(
        storageType,
        localStorage.getItem(storageType)
          ? JSON.stringify({
              ...JSON.parse(localStorage.getItem(storageType) as string),
              [`${id}`]: data
            })
          : JSON.stringify({ [`${id}`]: data })
      );
      dispatch(action({ [`${id}`]: data }));
    }

    if (action && !progressBarTypes.includes(type)) {
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

  const wsUrl = `${WS_URL}?token=${Cookies.get('token')}`;
  const websocket = new WebSocket(wsUrl);

  switch (action.type) {
    case websocketActionTypes.WEBSOCKET_CONNECT:
      if (ws) {
        ws.onclose = null;
        ws.close(WS_FULL_CLOSE_CODE);
      }

      clearTimeout(closeTimeout);

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
      if (ws && !ws.readyState) {
        setTimeout(() => {
          dispatch(websocketActions.sendAction(action.payload));
        }, WS_SEND_DELAY);
      } else if (ws && ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(action.payload));
      }

      break;

    case websocketActionTypes.WEBSOCKET_DISCONNECT:
      if (ws) {
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
