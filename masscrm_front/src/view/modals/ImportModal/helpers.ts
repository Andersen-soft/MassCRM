import {
  IGetDisabledTabsProps,
  IFieldsList,
  DisabledTabs
} from 'src/interfaces';

export const getDisabledInfo = (params: IGetDisabledTabsProps) => {
  const { errors, importStatus, fileInfo } = params;
  const disabledTabs: DisabledTabs = {};
  let isContinueDisabled = false;

  if (!fileInfo.name && !fileInfo.size) {
    disabledTabs.FieldMatching = true;
    disabledTabs.Duplicates = true;
    disabledTabs.Import = true;
    isContinueDisabled = true;
  }

  if (errors) {
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
    resultArr = [...resultArr, ...emptyValues];
  }

  return resultArr;
};
