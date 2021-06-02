import React, { useState, FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IStoreState, SetFieldItem } from 'src/interfaces';
import { FieldLabel, HorizontalDivider } from 'src/view/atoms';
import { SearchInput } from 'src/view/organisms';
import { CHOOSE_COLUMN_CONFIRM } from 'src/constants';
import { SKIP_FIELD } from './constants';
import { ISearchText, IDuplicatedField } from './interfaces';
import { Header, SimpleTable, QuestionModal } from './components';
import { useStyles } from './FieldMatching.styles';

interface IProps {
  onSetFieldValue: (fieldName: string, value: SetFieldItem) => void;
}

export const FieldMatching: FC<IProps> = props => {
  const styles = useStyles(props);

  const { onSetFieldValue } = props;

  const { docInfo, fieldsSelectList, formState, isHeaders } = useSelector(
    (state: IStoreState) => ({
      docInfo: state.import.docInfo,
      fieldsSelectList: state.import.fieldsSelectList,
      formState: state.import.formState,
      isHeaders: state.import.formState.isHeaders
    })
  );

  const [searchList, changeSearchList] = useState(fieldsSelectList);
  const [searchText, changeSearchText] = useState<ISearchText>({});
  const [
    duplicatedField,
    changeDuplicatedField
  ] = useState<IDuplicatedField | null>(null);

  const handleSearch = useCallback(
    (index: number) => (searchVal: string) => {
      changeSearchText((prevState: ISearchText) => ({
        ...prevState,
        [index]: searchVal
      }));
      let result: string[] = [];

      if (searchVal?.length > 1) {
        fieldsSelectList.forEach((field: string) =>
          field.toLowerCase().includes(searchVal.toLowerCase())
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

  const handleSetField = useCallback(
    (fieldName: string, index: number) => {
      const newSelectedFields: string[] = [...formState.fields];
      newSelectedFields[index] = fieldName;

      return newSelectedFields;
    },
    [formState.fields]
  );

  const handleSelect = useCallback(
    (index: number) => (selectedVal: string) => {
      const newSelectedFields = handleSetField(selectedVal, index);

      if (
        selectedVal &&
        selectedVal !== SKIP_FIELD &&
        formState.fields.includes(selectedVal)
      ) {
        changeDuplicatedField({
          name: selectedVal,
          index
        });
        return;
      }
      onSetFieldValue('fields', newSelectedFields);
      changeSearchList(fieldsSelectList);
    },
    [fieldsSelectList, formState.fields, handleSetField, onSetFieldValue]
  );

  const handleApplyDuplicatedField = useCallback(() => {
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

  const handleDeclineDuplicatedField = useCallback(() => {
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

  const handleResetSearchList = useCallback(() => {
    changeSearchList(fieldsSelectList);
  }, [fieldsSelectList]);

  return (
    <>
      <Header />
      <div className={styles.fieldsBlock}>
        <div className={styles.fieldsContainer}>
          {docInfo?.headers.map((header: string, index: number) => (
            <FieldLabel
              key={index}
              label={isHeaders ? `${header}:` : `Column ${index + 1}:`}
              className={styles.fieldLabel}
              labelClassName={styles.fieldLabelText}
            >
              <SearchInput
                className={styles.searchField}
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
      <div className={styles.importedData}>Imported data</div>
      <SimpleTable
        className={styles.table}
        rows={docInfo?.rows || []}
        headData={docInfo?.headers || []}
      />
      {duplicatedField ? (
        <QuestionModal
          message={CHOOSE_COLUMN_CONFIRM}
          onConfirm={handleApplyDuplicatedField}
          onClose={handleDeclineDuplicatedField}
        />
      ) : null}
    </>
  );
};
