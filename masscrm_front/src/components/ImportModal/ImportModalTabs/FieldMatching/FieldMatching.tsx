import * as React from 'react';
import { useSelector } from 'react-redux';
import { IStoreState, ISetFieldItem } from 'src/interfaces';
import { HorizontalDivider } from 'src/components/common/HorizontalDivider/HorizontalDivider';
import { FieldLabel } from 'src/components/common/FieldLabel/FieldLabel';
import { SearchInput } from 'src/components/common';
import { SimpleTable } from 'src/components/common/SimpleTable';
import { QuestionModal } from 'src/components/common/QuestionModal';
import { FieldMatchingHead } from './FieldMatchingHead';
import { useStyles } from './FieldMatching.styles';

interface Props {
  onSetFieldValue: (fieldName: string, value: ISetFieldItem) => void;
}

interface IduplicatedField {
  index: number;
  name: string;
}
interface ISearchText {
  [key: string]: string;
}

const SKIP_FIELD = 'Skip';

export const FieldMatching: React.FC<Props> = props => {
  const classes = useStyles(props);
  const { onSetFieldValue } = props;
  const { docInfo, fieldsSelectList, formState, isHeaders } = useSelector(
    (state: IStoreState) => ({
      docInfo: state.import.docInfo,
      fieldsSelectList: state.import.fieldsSelectList,
      formState: state.import.formState,
      isHeaders: state.import.formState.isHeaders
    })
  );

  const [searchList, changeSearchList] = React.useState(fieldsSelectList);
  const [searchText, changeSearchText] = React.useState<ISearchText>({});
  const [
    duplicatedField,
    changeDuplicatedField
  ] = React.useState<IduplicatedField | null>(null);

  const handleSearch = React.useCallback(
    (index: number) => (searchVal: string) => {
      changeSearchText((prevState: ISearchText) => ({
        ...prevState,
        [index]: searchVal
      }));
      let result: Array<string> = [];

      if (searchVal?.length > 1) {
        fieldsSelectList.forEach((field: string) =>
          field.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1
            ? result.push(field)
            : undefined
        );
      } else {
        result = fieldsSelectList;
      }

      changeSearchList(result);
    },
    [fieldsSelectList]
  );

  const handleSetField = React.useCallback(
    (fieldName: string, index: number) => {
      const newSelectedFields: string[] = [...formState.fields];
      newSelectedFields[index] = fieldName;

      return newSelectedFields;
    },
    [formState.fields]
  );

  const handleSelect = React.useCallback(
    (index: number) => (selectedVal: string) => {
      if (
        selectedVal &&
        selectedVal !== SKIP_FIELD &&
        formState.fields.indexOf(selectedVal) !== -1
      ) {
        changeDuplicatedField({
          name: selectedVal,
          index
        });
      } else {
        const newSelectedFields = handleSetField(selectedVal, index);
        onSetFieldValue('fields', newSelectedFields);
        changeSearchList(fieldsSelectList);
      }
    },
    [fieldsSelectList, formState.fields, handleSetField, onSetFieldValue]
  );

  const handleApplyDuplicatedField = React.useCallback(() => {
    if (duplicatedField) {
      onSetFieldValue(
        'fields',
        handleSetField(duplicatedField.name, duplicatedField.index)
      );
      changeSearchText((prevState: ISearchText) => ({
        ...prevState,
        [duplicatedField.index]: duplicatedField.name
      }));
      changeDuplicatedField(null);
      changeSearchList(fieldsSelectList);
    }
  }, [duplicatedField, fieldsSelectList, handleSetField, onSetFieldValue]);

  const handleDeclineDuplicatedField = React.useCallback(() => {
    onSetFieldValue('fields', formState.fields);
    changeSearchList(fieldsSelectList);
    if (duplicatedField) {
      changeSearchText((prevState: ISearchText) => ({
        ...prevState,
        [duplicatedField.index]: ''
      }));
    }
    changeDuplicatedField(null);
  }, [duplicatedField, fieldsSelectList, formState.fields, onSetFieldValue]);

  const handleResetSearchList = React.useCallback(() => {
    changeSearchList(fieldsSelectList);
  }, [fieldsSelectList]);

  return (
    <>
      <FieldMatchingHead />
      <div className={classes.fieldsBlock}>
        <div className={classes.fieldsContainer}>
          {docInfo?.headers.map((header: string, index: number) => (
            <FieldLabel
              label={isHeaders ? `${header}:` : `Column ${index + 1}:`}
              className={classes.fieldLabel}
              labelClassName={classes.fieldLabelText}
            >
              <SearchInput
                className={classes.searchField}
                items={searchList}
                placeholder='Choose field in CRM'
                value={formState.fields[index] || ''}
                inputValue={searchText[index] || ''}
                onSelect={handleSelect(index)}
                onChange={handleSearch(index)}
                onBlur={handleResetSearchList}
                onFocus={handleResetSearchList}
              />
            </FieldLabel>
          ))}
        </div>
      </div>
      <HorizontalDivider />
      <div className={classes.importedData}>Imported data</div>
      <SimpleTable
        className={classes.table}
        rows={docInfo?.rows || []}
        headData={docInfo?.headers || []}
      />
      {duplicatedField ? (
        <QuestionModal
          message='This column has been already selected. Are you sure you want to choose this column again?'
          onConfirm={handleApplyDuplicatedField}
          onClose={handleDeclineDuplicatedField}
        />
      ) : null}
    </>
  );
};
