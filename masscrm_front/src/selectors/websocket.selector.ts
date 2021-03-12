import { createSelector } from 'reselect';
import { IStoreState, IWSProgressBar } from 'src/interfaces';

export const getExportProgressValue = createSelector(
  ({ websocket }: IStoreState) => websocket.exportProgress,
  exportProgress => exportProgress || ({} as { [key: string]: IWSProgressBar })
);

export const getImportProgressValue = createSelector(
  ({ websocket }: IStoreState) => websocket.importProgress,
  importProgress => importProgress || ({} as { [key: string]: IWSProgressBar })
);
