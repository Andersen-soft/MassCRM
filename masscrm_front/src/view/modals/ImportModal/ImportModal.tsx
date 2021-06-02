import React, { FC, useCallback, useMemo, useEffect, useContext } from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  importActions,
  changeImportFormStateAction,
  setFileInfoAction,
  setShowStartImportMessageAction,
  clearFormState,
  getUser
} from 'src/store/slices';
import {
  IStoreState,
  IImportModalFormState,
  IImportedData,
  ITabConfig
} from 'src/interfaces';
import { useTabsState } from 'src/hooks';
import { ErrorsEmitterContext } from 'src/contexts';
import { Tabs } from 'src/view/molecules';
import {
  getImportTabsConfig,
  checkRequiredField,
  SnackErrorBarData
} from 'src/utils';
import { SNACKBAR_ERRORS, IMPORT_FORM_INITIAL_VALUES } from 'src/constants';
import { getDisabledInfo, getServerSideFields } from './helpers';
import { ALERT_DELAY, DUPLICATION_ACTION_CONFIG } from './constants';
import {
  Actions,
  Import,
  Duplicates,
  UploadingSettings,
  FieldMatching,
  MessageModal
} from './components';
import { useStyles } from './ImportModal.styles';

let ALERT_TIMEOUT: NodeJS.Timeout;
interface IProps {
  open: boolean;
  onClose?: () => void;
  importTabs?: string | number;
}

export const ImportModal: FC<IProps> = ({ open, onClose, importTabs }) => {
  const importStore = useSelector((state: IStoreState) => state.import);
  const { roles } = useSelector(getUser);

  const currentUserRole = Object.keys(roles).toString();

  const fieldsList = importStore.formState.fields;

  const styles = useStyles();

  const dispatch = useDispatch();

  const {
    errorsEventEmitter,
    errorsData: { snackBarErrors },
    handleClearErrors
  } = useContext(ErrorsEmitterContext);

  const tabsConfig = getImportTabsConfig(roles);

  const TABS_LIST = tabsConfig.map(({ key }: ITabConfig) => key);

  const DEFAULT_SELECTED_TAB = importTabs || tabsConfig[0].key;

  const TABS_STATE_PARAMS = {
    tabsList: TABS_LIST,
    defaultSelected: DEFAULT_SELECTED_TAB
  };

  const memoizedClasses = useMemo(
    () => ({
      dialog: { paper: styles.root },
      dialogContent: { root: styles.content }
    }),
    [styles.content, styles.root]
  );

  const tabsState = useTabsState(
    importStore.selectedTab
      ? { ...TABS_STATE_PARAMS, defaultSelected: importStore.selectedTab }
      : TABS_STATE_PARAMS
  );

  const handleSubmit = (formValues: IImportModalFormState) => {
    const data: IImportedData = {
      fields: getServerSideFields(
        formValues.fields,
        importStore.fieldsList,
        importStore.docInfo?.headers.length
      ),
      origin: formValues.origin.length ? formValues.origin : undefined,
      comment: formValues.comment || undefined,
      responsible: formValues?.responsible?.key
        ? +formValues.responsible.key
        : null,
      column_separator: formValues.columnSeparator.toLowerCase(),
      is_headers: +formValues.isHeaders,
      duplication_action: roles.manager
        ? formValues.duplicationAction
        : DUPLICATION_ACTION_CONFIG[currentUserRole],
      file_name: formValues.fileName || importStore.fileInfo.uploadName
    };
    dispatch(importActions.startImportingAction(data));
  };

  const form = useFormik({
    initialValues: importStore.formState,
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  const { disabledTabs, isContinueDisabled } = useMemo(
    () =>
      getDisabledInfo({
        errors: !!snackBarErrors.length,
        fileInfo: importStore.fileInfo,
        importStatus: importStore.importStatus
      }),
    [snackBarErrors, importStore.fileInfo, importStore.importStatus]
  );

  const handleResetForm = useCallback(() => {
    form.setValues(IMPORT_FORM_INITIAL_VALUES);
    dispatch(
      setFileInfoAction({
        name: '',
        size: ''
      })
    );
  }, [dispatch, form]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
      form.resetForm({});
      dispatch(clearFormState());
      tabsState.onChangeTab(DEFAULT_SELECTED_TAB);

      if (importStore.importStatus === 'none') {
        handleResetForm();
      }
    }
  }, [handleResetForm, importStore.importStatus, onClose, tabsState]);

  const handleCloseAlert = useCallback(() => {
    handleClearErrors();
  }, []);

  const handleCheckRequiredFieldsErr = useCallback(
    (selectedTab: string | number) => {
      const onlyIfErrors = checkRequiredField(roles, fieldsList);
      const errorsArray: JSX.Element[] = [
        ...snackBarErrors,
        ...SnackErrorBarData(onlyIfErrors)
      ];
      const isTriggerOnTab = roles.manager
        ? selectedTab === 'Duplicates'
        : selectedTab === 'Import';
      const isError = errorsArray.length && isTriggerOnTab;
      errorsEventEmitter.emit(SNACKBAR_ERRORS, { errorsArray });

      if (
        importStore.fieldsSelectList.length > 1 &&
        isError &&
        !snackBarErrors.length
      ) {
        clearTimeout(ALERT_TIMEOUT);
        ALERT_TIMEOUT = setTimeout(() => handleCloseAlert(), ALERT_DELAY);
      }
      return isError;
    },
    [
      snackBarErrors,
      handleCloseAlert,
      importStore.fieldsSelectList.length,
      importStore.formState.fields
    ]
  );
  const handleChangeTab = useCallback(
    (selectedTab: string | number) => {
      if (!handleCheckRequiredFieldsErr(selectedTab)) {
        tabsState.onChangeTab(selectedTab);
      }
    },
    [handleCheckRequiredFieldsErr, tabsState]
  );

  const handlePrevTab = useCallback(() => {
    tabsState.onPrevTab();
  }, [tabsState]);

  const handleNextTab = useCallback(() => {
    if (handleCheckRequiredFieldsErr(tabsState.getNextTab())) {
      return;
    }

    if (
      tabsState.selectedTab === 'Duplicates' ||
      (!roles.manager && tabsState.selectedTab === 'FieldMatching')
    ) {
      form.handleSubmit();
      return;
    }
    tabsState.onNextTab();
  }, [form, handleCheckRequiredFieldsErr, importStore.importStatus, tabsState]);

  const handleCloseStartImportMessage = useCallback(() => {
    dispatch(setShowStartImportMessageAction(false));
  }, [dispatch]);

  // Load data for origin, fields and column separator
  useEffect(() => {
    if (
      open &&
      !importStore.columnSeparatorList.length &&
      !importStore.originList.length
    ) {
      dispatch(importActions.loadOriginListAction());
      dispatch(importActions.loadFieldsListAction());
      dispatch(importActions.loadColumnSeparatorListAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Save form state to store
  useEffect(() => {
    dispatch(changeImportFormStateAction(form.values));
  }, [form.values]);

  useEffect(() => {
    if (importStore.showStartImportMessage && open) {
      handleClose();
    }
  }, [
    dispatch,
    form.values,
    handleClose,
    importStore.showStartImportMessage,
    onClose,
    open
  ]);

  // Will fill the fields with data from the file if there are matches with the database
  useEffect(() => {
    if (
      (importStore?.docInfo?.headers?.length || 0) &&
      !importStore.formState.fields.length
    ) {
      form.setFieldValue(
        'fields',
        importStore?.docInfo?.headers.map((header: string) =>
          importStore.fieldsSelectList.includes(header) ? header : undefined
        ) || []
      );
    }
  }, [form, importStore, importStore.docInfo]);

  if (!open) {
    return (
      <>
        {importStore.showStartImportMessage ? (
          <MessageModal
            message='Data import will take time. You will be notified by popup once this action is complete.'
            onClose={handleCloseStartImportMessage}
          />
        ) : null}
      </>
    );
  }

  return (
    <>
      <Dialog
        classes={memoizedClasses.dialog}
        open={open}
        onClose={onClose}
        maxWidth='md'
        disableBackdropClick
      >
        <DialogContent classes={memoizedClasses.dialogContent}>
          <form>
            <Tabs
              className={styles.tabs}
              contentClassName={styles.tabContent}
              tabsConfig={tabsConfig}
              defaultSelected={tabsState.selectedTab}
              selected={tabsState.selectedTab}
              disabledTabs={disabledTabs}
              onChange={handleChangeTab}
            >
              <UploadingSettings
                onFieldChange={form.handleChange}
                onSetFieldValue={form.setFieldValue}
                onClearFile={handleResetForm}
              />
              <FieldMatching onSetFieldValue={form.setFieldValue} />
              {roles.manager && <Duplicates onChange={form.handleChange} />}
              <Import />
            </Tabs>
          </form>
        </DialogContent>
        <DialogActions className={styles.actions}>
          <Actions
            isContinueDisabled={isContinueDisabled}
            selectedTab={tabsState.selectedTab}
            onClancel={handleClose}
            onBack={handlePrevTab}
            onContinue={handleNextTab}
          />
        </DialogActions>
      </Dialog>
      {importStore.showStartImportMessage ? (
        <MessageModal
          message='Data import will take time. You will be notified by popup once this action is complete.'
          onClose={handleCloseStartImportMessage}
        />
      ) : null}
    </>
  );
};
