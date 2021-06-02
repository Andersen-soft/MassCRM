import React, {
  FC,
  ChangeEvent,
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { importActions } from 'src/store/slices';
import {
  CustomCheckBox,
  CustomSelect,
  CustomTextarea,
  FieldLabel,
  HorizontalDivider
} from 'src/view/atoms';
import { IStoreState, SetFieldItem } from 'src/interfaces';
import { SearchInput } from 'src/view/organisms';
import { Upload } from './components';
import { SEARCH_DELAY, SEARCH_ROLES, SEARCH_SORT } from './constants';
import { useStyles } from './UploadingSettings.styles';

interface IProps {
  onClearFile: () => void;
  onFieldChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSetFieldValue: (fieldName: string, value: SetFieldItem) => void;
}

export const UploadingSettings: FC<IProps> = ({
  onClearFile,
  onFieldChange,
  onSetFieldValue
}) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const {
    columnSeparatorList,
    fetching,
    fileInfo,
    formState,
    originList,
    responsibleSearchList,
    userInfo
  } = useSelector((state: IStoreState) => ({
    columnSeparatorList: state.import.columnSeparatorList,
    fetching: state.import.fetching,
    fileInfo: state.import.fileInfo,
    formState: state.import.formState,
    originList: state.import.originList,
    responsibleSearchList: state.import.responsibleSearchList,
    userInfo: state.users.userData
  }));

  const uploadLabelClassNames = useMemo(
    () =>
      cn(styles.paddingBottom24, {
        [styles.aligntStart]: !!fileInfo.name && !!fileInfo.size
      }),
    [styles.aligntStart, styles.paddingBottom24, fileInfo.name, fileInfo.size]
  );

  const [searchResponsibleText, changeSearchResponsibleText] = useState('');

  const handleSetResponsibleSearch = useCallback(
    debounce((value: string) => {
      if (value) {
        dispatch(
          importActions.loadResponsibleSearchListAction({
            search: {
              fullName: value,
              roles: SEARCH_ROLES
            },
            sort: SEARCH_SORT
          })
        );
      }
    }, SEARCH_DELAY),
    []
  );

  const handleResponsibleSearch = useCallback(
    (value: string) => {
      changeSearchResponsibleText(value);
      handleSetResponsibleSearch(value);
    },
    [handleSetResponsibleSearch]
  );

  const handleResponsibleChange = useCallback(
    (value: string) => {
      onSetFieldValue('responsible', value || '');
    },
    [onSetFieldValue]
  );

  const hadnleFLContainHeadersChange = useCallback(
    (value: boolean) => {
      onSetFieldValue('isHeaders', value);
    },
    [onSetFieldValue]
  );

  const handleUpload = useCallback(
    (file: File) => {
      dispatch(importActions.uploadFileAction(file));
    },
    [dispatch]
  );

  useEffect(() => {
    if (userInfo && !formState.responsible) {
      const { id, name, surname } = userInfo;

      onSetFieldValue('responsible', {
        key: `${id}`,
        label: `${name} ${surname}`
      });
      changeSearchResponsibleText(`${name} ${surname}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <div className={styles.colConainer}>
      <div className={`${styles.rowConainer} ${styles.flexWrap}`}>
        <div className={`${styles.colConainer} ${styles.paddingRight40}`}>
          <FieldLabel
            label='*.csv, .xls file:'
            className={uploadLabelClassNames}
            labelClassName={styles.labelText}
          >
            <Upload
              fileInfoClassName={styles.fileInfo}
              fetching={fetching.uploadFile}
              fileName={fileInfo.name}
              fileSize={fileInfo.size}
              disabled={!!fileInfo.name}
              onUpload={handleUpload}
              onClear={onClearFile}
            />
          </FieldLabel>
          <FieldLabel
            label='Origin:'
            className={styles.paddingBottom24}
            labelClassName={styles.labelText}
          >
            <CustomSelect
              items={originList}
              name='origin'
              placeholder=''
              value={formState.origin}
              onChange={onFieldChange}
              hideClearBtn
              eventInResult
              multi
            />
          </FieldLabel>
          <FieldLabel
            label='Responsible:'
            className={styles.paddingBottom24}
            labelClassName={styles.labelText}
          >
            <SearchInput
              name='responsible'
              className={styles.searchField}
              items={responsibleSearchList}
              placeholder=''
              value={formState.responsible}
              inputValue={searchResponsibleText}
              disabled={!userInfo?.roles?.manager}
              onSelect={handleResponsibleChange}
              onChange={handleResponsibleSearch}
            />
          </FieldLabel>
        </div>
        <div>
          <FieldLabel
            label='Comment:'
            className={`${styles.paddingBottom24} ${styles.aligntStart}`}
          >
            <CustomTextarea
              className={styles.commentField}
              name='comment'
              value={formState.comment}
              placeholder='Write your comment'
              onChange={onFieldChange}
            />
          </FieldLabel>
        </div>
      </div>
      <HorizontalDivider />
      <div className={`${styles.rowConainer} ${styles.flexWrap}`}>
        <FieldLabel
          label='Column separator:'
          className={`${styles.paddingRight40} ${styles.paddingTop24}`}
        >
          <CustomSelect
            items={columnSeparatorList}
            name='columnSeparator'
            placeholder=''
            onChange={onFieldChange}
            value={formState.columnSeparator}
            hideClearBtn
            eventInResult
          />
        </FieldLabel>
        <FieldLabel
          label='The first line contains the headers:'
          className={styles.paddingTop24}
        >
          <CustomCheckBox
            value={formState.isHeaders}
            onChange={hadnleFLContainHeadersChange}
          />
        </FieldLabel>
      </div>
    </div>
  );
};
