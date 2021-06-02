import { handleActions, Action } from 'redux-actions';
import { IImportStore } from 'src/interfaces';
import { IMPORT_FORM_INITIAL_VALUES } from 'src/constants';
import { INFO_INITIAL_VALUES } from './constants';
import { importActionTypes } from '.';

type S = IImportStore;

const initialState: IImportStore = {
  columnSeparatorList: [],
  fetching: {
    uploadFile: false
  },
  fieldsList: {},
  fieldsSelectList: ['Skip'],
  fileInfo: {
    uploadName: '',
    name: '',
    size: ''
  },
  formState: IMPORT_FORM_INITIAL_VALUES,
  importStatus: 'none',
  info: INFO_INITIAL_VALUES,
  isImportModalOpen: false,
  originList: [],
  responsibleSearchList: [],
  showStartImportMessage: false,
  selectedTab: ''
};

export const importReducer = handleActions(
  {
    [importActionTypes.OPEN_IMPORT_MODAL]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.CLOSE_IMPORT_MODAL]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.LOAD_RESPONSIBLE_SEARCH_LIST]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.LOAD_COLUMN_SEPARATOP_LIST]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.LOAD_ORIGIN_LIST]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.LOAD_FIELDS_LIST]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.CHANGE_IMPORT_FORM_STATE]: (
      state: S,
      { payload }
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.SET_FILE_INFO]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.SET_FETCHING]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.UPLOAD_FILE]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.SET_INFO]: (state: S, { payload }: Action<any>): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.START_IMPORTING]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.PROCESSING_IMPORTING]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.FINISH_IMPORTING]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.SET_SELECTED_TAB]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.SET_SHOW_START_IMPORT_MESSAGE]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    }),
    [importActionTypes.CLEAR_IMPORT_FORM_STATE]: (state: S): S => ({
      ...state,
      fileInfo: initialState.fileInfo,
      formState: initialState.formState,
      docInfo: undefined
    })
  },
  initialState
);
