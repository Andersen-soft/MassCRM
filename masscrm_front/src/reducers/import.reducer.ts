import { handleActions, Action } from 'redux-actions';
import { importActionTypes } from 'src/actions/import.action';
import { IImportStore } from 'src/interfaces/store';
import { IImportModalFormState, IInfo } from 'src/interfaces/IImportModal';
import { IUser } from 'src/interfaces';
import { formatSearchList } from 'src/utils/importModal/formatSearchList';

type S = IImportStore;

export const IMPORT_FORM_INITIAL_VALUES: IImportModalFormState = {
  columnSeparator: 'Comma',
  comment: '',
  duplicationAction: 'replace',
  fields: [],
  isHeaders: true,
  origin: [],
  responsible: undefined
};

export const INFO_INITIAL_VALUES: IInfo = {
  newContacts: 0,
  newCompanies: 0,
  duplicateContacts: 0,
  duplicateCompanies: 0,
  missedDuplicates: 0,
  missedDuplicatesLink: '',
  unsProcesDuplicates: 0,
  unsProcesDuplicatesLink: ''
};

const initialState: IImportStore = {
  columnSeparatorList: [],
  fetching: {
    uploadFile: false
  },
  fieldsList: {},
  fieldsSelectList: ['Skip'],
  fileInfo: {
    name: '',
    size: ''
  },
  formState: IMPORT_FORM_INITIAL_VALUES,
  importStatus: 'none',
  info: INFO_INITIAL_VALUES,
  isImportModalOpen: false,
  originList: [],
  responsibleSearchList: [],
  showStartImportMessage: false
};

export const importReducer = handleActions(
  {
    [importActionTypes.OPEN_IMPORT_MODAL]: (state: S): S => ({
      ...state,
      isImportModalOpen: true
    }),
    [importActionTypes.CLOSE_IMPORT_MODAL]: (state: S): S => ({
      ...state,
      isImportModalOpen: false
    }),
    [importActionTypes.LOAD_RESPONSIBLE_SEARCH_LIST]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      responsibleSearchList: formatSearchList(
        payload?.data?.filter(
          (userInfo: IUser) => !userInfo.roles.administrator
        ) || initialState.responsibleSearchList
      )
    }),
    [importActionTypes.LOAD_COLUMN_SEPARATOP_LIST]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      columnSeparatorList: payload?.['column_separator']
        ? Object.values(payload.column_separator)
        : []
    }),
    [importActionTypes.LOAD_ORIGIN_LIST]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      originList: payload?.['origin']
        ? Object.values(payload.origin)
        : initialState.originList
    }),
    [importActionTypes.LOAD_FIELDS_LIST]: (
      state: S,
      { payload }: Action<any>
    ): S => {
      const fieldsList = payload?.fields || initialState.fieldsList;
      const fieldsSelectList = fieldsList
        ? ['Skip', ...(Object.values(fieldsList) as string[])]
        : initialState.fieldsSelectList;

      return {
        ...state,
        fieldsList,
        fieldsSelectList
      };
    },
    [importActionTypes.CHANGE_IMPORT_FORM_STATE]: (
      state: S,
      { payload }
    ): S => ({
      ...state,
      formState: {
        ...state.formState,
        ...payload
      }
    }),
    [importActionTypes.SET_FILE_INFO]: (state: S, { payload }): S => ({
      ...state,
      fileInfo: {
        ...state.fileInfo,
        ...payload
      }
    }),
    [importActionTypes.SET_FETCHING]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      fetching: {
        ...state.fetching,
        ...payload
      }
    }),
    [importActionTypes.UPLOAD_FILE]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      docInfo: payload.data,
      fileInfo: {
        ...state.fileInfo,
        size: payload.file_size || ''
      }
    }),
    [importActionTypes.START_IMPORTING]: (state: S): S => ({
      ...state,
      importStatus: 'processing'
    }),
    [importActionTypes.SET_SHOW_START_IMPORT_MESSAGE]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      showStartImportMessage: payload
    }),
    // TODO: correct it when such functional will be on backend
    [importActionTypes.LOAD_IMPORT_RES_INFO]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      docInfo: payload.docInfo,
      importStatus: payload.importStatus || 'success',
      formState: payload.form,
      selectedTab: 'Info'
    })
  },
  initialState
);
