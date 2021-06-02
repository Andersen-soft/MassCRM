import { createSelector } from 'reselect';
import { IStoreState, IWSProgressBar } from 'src/interfaces';

export const getExportProgressValue = createSelector(
  ({ websocket: { exportProgress } }: IStoreState) => exportProgress,
  exportProgress => exportProgress || ({} as { [key: string]: IWSProgressBar })
);

export const getImportProgressValue = createSelector(
  ({ websocket: { importProgress } }: IStoreState) => importProgress,
  importProgress => importProgress || ({} as { [key: string]: IWSProgressBar })
);

export const getWs = createSelector(
  ({ websocket: { ws } }: IStoreState) => ws,
  ws => ws
);
