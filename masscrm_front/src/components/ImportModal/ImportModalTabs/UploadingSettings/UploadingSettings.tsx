import * as React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { importActions } from 'src/actions/import.action';
import { HorizontalDivider } from 'src/components/common/HorizontalDivider';
import { FieldLabel } from 'src/components/common/FieldLabel';
import { Upload } from 'src/components/common/Upload';
import {
  CustomCheckBox,
  CustomSelect,
  SearchInput,
  CustomTextarea
} from 'src/components/common';
import { IStoreState, ISetFieldItem } from 'src/interfaces';
import { ChangeEvent } from 'react';
import { useStyles } from './UploadingSettings.styles';

interface Props {
  onClearFile: () => void;
  onFieldChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSetFieldValue: (fieldName: string, value: ISetFieldItem) => void;
}

const SEARCH_DELAY = 300;
const SEARCH_ROLES = ['manager', 'nc1', 'nc2'];
const SEARCH_SORT = {
  fieldName: 'fullName',
  typeSort: 'ASC'
};

export const UploadingSettings: React.FC<Props> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onClearFile, onFieldChange, onSetFieldValue } = props;

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

  const uploadLabelClassNames = React.useMemo(
    () =>
      cn(classes.paddingBottom24, {
        [classes.aligntStart]: Boolean(fileInfo.name) && Boolean(fileInfo.size)
      }),
    [classes.aligntStart, classes.paddingBottom24, fileInfo.name, fileInfo.size]
  );

  const [searchResponsibleText, changeSearchResponsibleText] = React.useState(
    ''
  );

  const handleSetResponsibleSearch = React.useCallback(
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

  const handleResponsibleSearch = React.useCallback(
    (value: string) => {
      changeSearchResponsibleText(value);
      handleSetResponsibleSearch(value);
    },
    [handleSetResponsibleSearch]
  );

  const handleResponsibleChange = React.useCallback(
    (value: string) => {
      onSetFieldValue('responsible', value || '');
    },
    [onSetFieldValue]
  );

  const hadnleFLContainHeadersChange = React.useCallback(
    (value: boolean) => {
      onSetFieldValue('isHeaders', value);
    },
    [onSetFieldValue]
  );

  const handleUpload = React.useCallback(
    (file: File) => {
      dispatch(importActions.uploadFileAction(file));
      dispatch(
        importActions.setFileInfoAction({
          name: file.name
        })
      );
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (userInfo && !formState.responsible) {
      onSetFieldValue('responsible', {
        key: String(userInfo.id),
        label: `${userInfo.name} ${userInfo.surname}`
      });
      changeSearchResponsibleText(`${userInfo.name} ${userInfo.surname}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <div className={classes.colConainer}>
      <div className={`${classes.rowConainer} ${classes.flexWrap}`}>
        <div className={`${classes.colConainer} ${classes.paddingRight40}`}>
          <FieldLabel
            label='*.csv, .xls file:'
            className={uploadLabelClassNames}
            labelClassName={classes.labelText}
          >
            <Upload
              fileInfoClassName={classes.fileInfo}
              fetching={fetching.uploadFile}
              fileName={fileInfo.name}
              fileSize={fileInfo.size}
              disabled={Boolean(fileInfo.name)}
              onUpload={handleUpload}
              onClear={onClearFile}
            />
          </FieldLabel>
          <FieldLabel
            label='Origin:'
            className={classes.paddingBottom24}
            labelClassName={classes.labelText}
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
            className={classes.paddingBottom24}
            labelClassName={classes.labelText}
          >
            <SearchInput
              name='responsible'
              className={classes.searchField}
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
            className={`${classes.paddingBottom24} ${classes.aligntStart}`}
          >
            <CustomTextarea
              className={classes.commentField}
              name='comment'
              value={formState.comment}
              placeholder='Write your comment'
              onChange={onFieldChange}
            />
          </FieldLabel>
        </div>
      </div>
      <HorizontalDivider />
      <div className={`${classes.rowConainer} ${classes.flexWrap}`}>
        <FieldLabel
          label='Column separator:'
          className={`${classes.paddingRight40} ${classes.paddingTop24}`}
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
          className={classes.paddingTop24}
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
