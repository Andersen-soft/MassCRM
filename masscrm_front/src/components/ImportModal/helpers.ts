import {
  IGetDisabledTabsProps,
  IFieldsList
} from 'src/interfaces/IImportModal';
import { DisabledTabs } from '../common/Tabs';

export const getDisabledInfo = (params: IGetDisabledTabsProps) => {
  const { errorMessage, importStatus, fileInfo } = params;
  const disabledTabs: DisabledTabs = {};
  let isContinueDisabled = false;

  if (!fileInfo.name && !fileInfo.size) {
    disabledTabs.FieldMatching = true;
    disabledTabs.Duplicates = true;
    disabledTabs.Import = true;
    isContinueDisabled = true;
  }

  if (errorMessage) {
    disabledTabs.Duplicates = true;
    disabledTabs.Import = true;
    isContinueDisabled = true;
  }

  if (importStatus !== 'success') {
    disabledTabs.Import = true;
  }

  return { isContinueDisabled, disabledTabs };
};

export const getServerSideFields = (
  fields: string[],
  fieldsList: IFieldsList,
  fieldsNum?: number
) => {
  let resultArr = Array.from(fields, field => {
    let result = 'skip';

    if (!field) {
      return result;
    }

    Object.keys(fieldsList).forEach((key: string) => {
      const fieldData = fieldsList[key];

      if (fieldData === field) {
        result = key;
      }
    });

    return result;
  });

  if (fieldsNum && resultArr.length < fieldsNum) {
    const emptyValues = new Array(fieldsNum - resultArr.length).fill('skip');
    resultArr = resultArr.concat(emptyValues);
  }

  return resultArr;
};
