import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import qs from 'qs';
import { setErrorHTTPRequestAction } from '.';
import HTTP, { HTTPFile } from '../utils/http';
import { IExportSearch } from '../interfaces';
import { download } from '../utils/download';

export const getExportListAction = createAction('GET_EXPORT_LIST');
export const setExportFilterAction = createAction('GET_EXPORT_FILTER');

export const getExportListRequest = (filter: IExportSearch) => {
  return HTTP.get(`export/processes`, {
    params: { ...filter },
    paramsSerializer(params: IExportSearch) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
};

export const getExportList = (filter: IExportSearch) => async (
  dispatch: Dispatch
) => {
  try {
    const data = await getExportListRequest(filter);
    dispatch(getExportListAction(data));
  } catch (error) {
    dispatch(setErrorHTTPRequestAction(error.toString()));
  }
};

export const setExportFilter = (filter: {
  [x: number]: string | (string | Date)[];
}) => (dispatch: Dispatch) => {
  dispatch(setExportFilterAction({ filter }));
};

export const getAutocompleteExport = async (filter: IExportSearch) => {
  try {
    return await getExportListRequest(filter);
  } catch (error) {
    throw new Error(JSON.stringify(error.data));
  }
};

export const getExportFile = async (
  name: string,
  nameFile?: string,
  dispatch?: Dispatch
) => {
  try {
    const { request } = await HTTPFile.get('file/get', {
      params: { name },
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
    download(request.response, `${nameFile || 'Report'}.csv`, 'text/csv');
  } catch (error) {
    dispatch && dispatch(setErrorHTTPRequestAction(error.toString()));
  }
};
