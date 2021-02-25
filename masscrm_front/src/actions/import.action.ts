import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import qs from 'qs';
import {
  IContactDownload,
  IFilter,
  IImportedData,
  IImportModalFormState,
  IImportSearch,
  IUser
} from 'src/interfaces';
import parseJSON from 'date-fns/parseJSON';
import { format } from 'date-fns';
import HTTP, { HTTPFile } from '../utils/http';
import { download } from '../utils/download';
import { setNotification } from './notification.action';
import { formatSearchList } from '../utils/importModal/formatSearchList';
import { setErrorHTTPRequestAction } from './error.action';

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
  PROCESSING_IMPORTING: 'PROCESSING_IMPORTING',
  FINISH_IMPORTING: 'FINISH_IMPORTING',
  SET_SHOW_START_IMPORT_MESSAGE: 'SET_SHOW_START_IMPORT_MESSAGE',
  SET_SELECTED_TAB: 'SET_SELECTED_TAB',
  SET_INFO: 'SET_INFO',
  GET_IMPORT_LIST: 'GET_IMPORT_LIST',
  SET_IMPORT_FILTER: 'SET_IMPORT_FILTER',
  CLEAR_IMPORT_FORM_STATE: 'CLEAR_IMPORT_FORM_STATE'
};

const openImportModal = createAction(importActionTypes.OPEN_IMPORT_MODAL);
const closeImportModal = createAction(importActionTypes.CLOSE_IMPORT_MODAL);
const changeImportFormState = createAction(
  importActionTypes.CHANGE_IMPORT_FORM_STATE
);
const setFetchingAction = createAction(importActionTypes.SET_FETCHING);
const loadOriginList = createAction(importActionTypes.LOAD_ORIGIN_LIST);
const loadResponsibleSearchList = createAction(
  importActionTypes.LOAD_RESPONSIBLE_SEARCH_LIST
);
const loadColumnSeparatorList = createAction(
  importActionTypes.LOAD_COLUMN_SEPARATOP_LIST
);
const loadFieldsList = createAction(importActionTypes.LOAD_FIELDS_LIST);
const uploadFile = createAction(importActionTypes.UPLOAD_FILE);
const setShowStartImportMessage = createAction(
  importActionTypes.SET_SHOW_START_IMPORT_MESSAGE
);
const startImporting = createAction(importActionTypes.START_IMPORTING);
const processingImporting = createAction(
  importActionTypes.PROCESSING_IMPORTING
);
const setInfo = createAction(importActionTypes.SET_INFO);
const setSelectedTab = createAction(importActionTypes.SET_SELECTED_TAB);
const setFileInfo = createAction(importActionTypes.SET_FILE_INFO);
const finishImport = createAction(importActionTypes.FINISH_IMPORTING);
const clearImportFormState = createAction(
  importActionTypes.CLEAR_IMPORT_FORM_STATE
);

export const getImportListAction = createAction('GET_IMPORT_LIST');
export const setImportFilterAction = createAction('SET_IMPORT_FILTER');

export const openImportModalAction = (value: boolean) => (
  dispatch: Dispatch
) => {
  dispatch(openImportModal({ isImportModalOpen: value }));
};

export const closeImportModalAction = (value: boolean) => (
  dispatch: Dispatch
) => {
  dispatch(closeImportModal({ isImportModalOpen: value }));
};

export const changeImportFormStateAction = (
  formState: IImportModalFormState
) => (dispatch: Dispatch) => {
  dispatch(changeImportFormState({ formState }));
};

const loadResponsibleSearchListAction = (actionParams: IFilter) => async (
  dispatch: Dispatch
) => {
  try {
    const { data } = await HTTP.get(`users`, {
      params: actionParams,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
    const responsibleSearchList = formatSearchList(
      data?.filter((userInfo: IUser) => !userInfo.roles.administrator) || []
    );
    dispatch(loadResponsibleSearchList({ responsibleSearchList }));
  } catch (error) {
    setNotification(error);
  }
};

const loadColumnSeparatorListAction = () => async (dispatch: Dispatch) => {
  try {
    const {
      data: { column_separator }
    } = await HTTP.get(`filters/`, {
      params: {
        filters: ['column_separator']
      }
    });
    const columnSeparatorList = column_separator
      ? Object.values(column_separator)
      : [];

    dispatch(loadColumnSeparatorList({ columnSeparatorList }));
  } catch (error) {
    setNotification(error);
  }
};

const loadOriginListAction = () => async (dispatch: Dispatch) => {
  try {
    const {
      data: { origin }
    } = await HTTP.get(`filters/`, {
      params: {
        filters: ['origin']
      }
    });
    dispatch(loadOriginList({ originList: origin || [] }));
  } catch (error) {
    setNotification(error);
  }
};

const loadFieldsListAction = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await HTTP.get(`filters/`, {
      params: {
        filters: ['fields']
      }
    });
    const fieldsList = data?.fields || {};
    const fieldsSelectList = fieldsList
      ? [...(Object.values(fieldsList) as string[])]
      : ['Skip'];

    dispatch(loadFieldsList({ fieldsList, fieldsSelectList }));
  } catch (error) {
    setNotification(error);
  }
};

const uploadFileAction = (file: File) => async (dispatch: Dispatch) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    dispatch(setFetchingAction({ fetching: { uploadFile: true } }));

    const {
      data: { data, file_size }
    } = await HTTP.post('import/upload-file/', formData);
    dispatch(
      uploadFile({
        docInfo: data,
        fileInfo: { name: file.name, size: file_size }
      })
    );
    dispatch(setFetchingAction({ fetching: { uploadFile: false } }));
  } catch (error) {
    setNotification(error);
    dispatch(setFetchingAction({ fetching: { uploadFile: false } }));
  }
};

export const setShowStartImportMessageAction = (value: boolean) => (
  dispatch: Dispatch
) => {
  dispatch(setShowStartImportMessage({ showStartImportMessage: value }));
};

const startImportingAction = (importedData: IImportedData) => async (
  dispatch: Dispatch
) => {
  try {
    const data = await HTTP.post('import/start-parse/', importedData);
    dispatch(startImporting(data));
    dispatch(processingImporting({ importStatus: 'processing' }));
    dispatch(setShowStartImportMessage({ showStartImportMessage: true }));
  } catch (error) {
    setNotification(error);
  }
};

export const setFileInfoAction = (fileInfo: { name: string; size: string }) => (
  dispatch: Dispatch
) => {
  dispatch(setFileInfo({ fileInfo }));
};

export const getCountDownloadReport = async (filter: IContactDownload) => {
  const {
    data: { count }
  } = await HTTP.post('contact/reports/download-count', filter);
  return count;
};

export const downLoadReport = async (filter: IContactDownload) => {
  try {
    await HTTP.post('contact/reports/download', { ...filter });
  } catch (error) {
    setNotification(error);
  }
};

export const getContactExportFile = async (name: string, date: Date) => {
  try {
    const { request } = await HTTPFile.get('file/get', {
      params: { name },
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });

    download(
      request.response,
      `Contacts_${format(parseJSON(date), 'ddMMyy_HHmm')}.csv`,
      'text/csv'
    );
  } catch (error) {
    setNotification(error);
  }
};

export const getUnsuccessfullyProcessedDuplicates = async (name: string) => {
  try {
    const { request } = await HTTPFile.get(`file/get`, {
      params: { name }
    });
    download(
      request.response,
      'UnsuccessfullyProcessedDuplicates.csv',
      'text/csv'
    );
  } catch (error) {
    setNotification(error);
  }
};

export const getMissedDuplicates = async (name: string) => {
  try {
    const { request } = await HTTPFile.get(`file/get`, {
      params: { name }
    });
    download(request.response, 'MissedDuplicates.csv', 'text/csv');
  } catch (error) {
    setNotification(error);
  }
};

export const getImportResult = (id: number) => async (dispatch: Dispatch) => {
  try {
    const {
      data: [
        {
          countNewContacts,
          countNewCompanies,
          countProcessedDuplicateContacts,
          countProcessedDuplicateCompanies,
          countMissedDuplicates,
          fileNameMissedDuplicates,
          countUnsuccessfully,
          fileNameUnsuccessfullyDuplicates
        }
      ]
    } = await HTTP.get(`import/statistic/`, {
      params: { id }
    });
    dispatch(
      setInfo({
        info: {
          countNewContacts,
          countNewCompanies,
          countProcessedDuplicateContacts,
          countProcessedDuplicateCompanies,
          countMissedDuplicates,
          fileNameMissedDuplicates,
          countUnsuccessfully,
          fileNameUnsuccessfullyDuplicates
        }
      })
    );
  } catch (error) {
    setNotification(error);
  }
};

export const setSelectedTabAction = (tab: string | number) => (
  dispatch: Dispatch
) => {
  dispatch(setSelectedTab({ selectedTab: tab }));
};

export const finishImportAction = () => (dispatch: Dispatch) => {
  dispatch(finishImport({ importStatus: 'none' }));
};

export const getImportListRequest = (filter: IImportSearch) => {
  return HTTP.get(`processes/import`, {
    params: { ...filter },
    paramsSerializer(params: IImportSearch) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
};

export const getImportList = (filter: IImportSearch) => async (
  dispatch: Dispatch
) => {
  try {
    const data = await getImportListRequest(filter);
    dispatch(getImportListAction(data));
  } catch (error) {
    dispatch(setErrorHTTPRequestAction(error.toString()));
  }
};

export const setImportFilter = (filter: {
  [x: number]: string | (string | Date)[];
}) => (dispatch: Dispatch) => {
  dispatch(setImportFilterAction({ filter }));
};

export const getAutocompleteImport = async (filter: IImportSearch) => {
  try {
    return await getImportListRequest(filter);
  } catch (error) {
    throw new Error(JSON.stringify(error.data));
  }
};

export const clearFormState = () => (dispatch: Dispatch) => {
  dispatch(clearImportFormState());
};

export const importActions = {
  loadResponsibleSearchListAction,
  loadColumnSeparatorListAction,
  loadOriginListAction,
  loadFieldsListAction,
  uploadFileAction,
  startImportingAction
};
