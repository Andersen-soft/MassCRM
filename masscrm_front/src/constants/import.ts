import { IImportModalFormState } from 'src/interfaces';

export const IMPORT_FORM_INITIAL_VALUES: IImportModalFormState = {
  columnSeparator: 'Comma',
  comment: '',
  duplicationAction: 'replace',
  fields: [],
  isHeaders: true,
  origin: [],
  responsible: undefined,
  fileName: ''
};
