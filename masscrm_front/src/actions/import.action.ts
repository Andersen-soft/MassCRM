import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import qs from 'qs';
import { IContactDownload, IFilter, IImportedData } from 'src/interfaces';
import HTTP, { HTTPFile } from '../utils/http';
import { download } from '../utils/download';
import { setNotification } from './notification.action';

export const importActionTypes = {
  OPEN_IMPORT_MODAL: 'OPEN_IMPORT_MODAL',
  CLOSE_IMPORT_MODAL: 'CLOSE_IMPORT_MODAL',
  LOAD_RESPONSIBLE_SEARCH_LIST: 'LOAD_RESPONSIBLE_SEARCH_LIST',
  LOAD_COLUMN_SEPARATOP_LIST: 'LOAD_COLUMN_SEPARATOP_LIST',
  LOAD_ORIGIN_LIST: 'LOAD_ORIGIN_LIST',
  LOAD_FIELDS_LIST: 'LOAD_FIELDS_LIST',
  UPLOAD_FILE: 'UPLOAD_FILE',
  CHANGE_IMPORT_FORM_STATE: 'CHANGE_IMPORT_FORM_STATE',
  SET_FILE_INFO: 'SET_FILE_INFO',
  SET_FETCHING: 'SET_FETCHING',
  START_IMPORTING: 'START_IMPORTING',
  SET_SHOW_START_IMPORT_MESSAGE: 'SET_SHOW_START_IMPORT_MESSAGE',
  LOAD_IMPORT_RES_INFO: 'LOAD_IMPORT_RES_INFO'
};

const setFetchingAction = createAction(importActionTypes.SET_FETCHING);
const loadResponsibleSearchList = createAction(
  importActionTypes.LOAD_RESPONSIBLE_SEARCH_LIST
);
const loadResponsibleSearchListAction = (actionParams: IFilter) => async (
  dispatch: Dispatch
) => {
  try {
    const data = await HTTP.get(`users`, {
      params: actionParams,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });

    dispatch(loadResponsibleSearchList(data));
  } catch (error) {
    setNotification(error);
  }
};

const loadColumnSeparatorList = createAction(
  importActionTypes.LOAD_COLUMN_SEPARATOP_LIST
);
const loadColumnSeparatorListAction = () => async (dispatch: Dispatch) => {
  try {
    const data = await HTTP.get(`filters/`, {
      params: {
        filters: ['column_separator']
      }
    });

    dispatch(loadColumnSeparatorList(data));
  } catch (error) {
    setNotification(error);
  }
};

const loadOriginList = createAction(importActionTypes.LOAD_ORIGIN_LIST);
const loadOriginListAction = () => async (dispatch: Dispatch) => {
  try {
    const data = await HTTP.get(`filters/`, {
      params: {
        filters: ['origin']
      }
    });

    dispatch(loadOriginList(data));
  } catch (error) {
    setNotification(error);
  }
};

const loadFieldsList = createAction(importActionTypes.LOAD_FIELDS_LIST);
const loadFieldsListAction = () => async (dispatch: Dispatch) => {
  try {
    const data = await HTTP.get(`filters/`, {
      params: {
        filters: ['fields']
      }
    });

    dispatch(loadFieldsList(data));
  } catch (error) {
    setNotification(error);
  }
};

const uploadFile = createAction(importActionTypes.UPLOAD_FILE);
const uploadFileAction = (file: File) => async (dispatch: Dispatch) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    dispatch(setFetchingAction({ uploadFile: true }));

    const data = await HTTP.post('import/upload-file/', formData);

    dispatch(uploadFile(data));
    dispatch(setFetchingAction({ uploadFile: false }));
  } catch (error) {
    setNotification(error);

    dispatch(setFetchingAction({ uploadFile: false }));
  }
};

const setShowStartImportMessageAction = createAction(
  importActionTypes.SET_SHOW_START_IMPORT_MESSAGE
);

const startImporting = createAction(importActionTypes.START_IMPORTING);
const startImportingAction = (inportedData: IImportedData) => async (
  dispatch: Dispatch
) => {
  try {
    const data = await HTTP.post('import/start-parse/', inportedData);

    dispatch(startImporting(data));
    dispatch(setShowStartImportMessageAction(true));
  } catch (error) {
    setNotification(error);
  }
};

// TODO: correct it when such functional will be on backend
const loadImportResInfo = createAction(importActionTypes.LOAD_IMPORT_RES_INFO);
const loadImportResInfoAction = () => async (dispatch: Dispatch) => {
  try {
    const data = await HTTP.post('import/');

    dispatch(loadImportResInfo(data));
  } catch (error) {
    setNotification(error);
  }
};

export const importActions = {
  openImportModalAction: createAction(importActionTypes.OPEN_IMPORT_MODAL),
  closeImportModalAction: createAction(importActionTypes.CLOSE_IMPORT_MODAL),
  loadResponsibleSearchListAction,
  loadColumnSeparatorListAction,
  loadOriginListAction,
  loadFieldsListAction,
  loadImportResInfoAction,
  uploadFileAction,
  changeImportFormStateAction: createAction(
    importActionTypes.CHANGE_IMPORT_FORM_STATE
  ),
  setFileInfoAction: createAction(importActionTypes.SET_FILE_INFO),
  startImportingAction,
  setShowStartImportMessageAction
};

export const downLoadReport = async (filter: IContactDownload) => {
  try {
    const { request } = await HTTPFile.post('contact/reports/download', {
      ...filter
    });
    download(request.response, 'report.csv', 'text/csv');
  } catch (error) {
    setNotification(error);
  }
};
