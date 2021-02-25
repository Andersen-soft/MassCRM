import * as React from 'react';
import * as yup from 'yup';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  importActions,
  changeImportFormStateAction,
  setFileInfoAction,
  setShowStartImportMessageAction,
  clearFormState
} from 'src/actions/import.action';
import { IMPORT_FORM_INITIAL_VALUES } from 'src/reducers/import.reducer';
import {
  IStoreState,
  IImportModalFormState,
  IImportedData
} from 'src/interfaces';
import { useTabsState } from 'src/hooks/tabs.hook';
import { ErrorEmitterContext } from 'src/context';
import { useContext } from 'react';
import { getUser } from 'src/selectors';
import { Tabs, TabsConfig, TabConfig } from '../common/Tabs';
import { MessageModal } from '../common/MessageModal';
import { UploadingSettings } from './ImportModalTabs/UploadingSettings';
import { FieldMatching } from './ImportModalTabs/FieldMatching';
import { Duplicates } from './ImportModalTabs/Duplicates';
import { Import } from './ImportModalTabs/Import';
import { useStyles } from './ImportModal.styles';
import { getDisabledInfo, getServerSideFields } from './helpers';
import { ImportModalActions } from './ImportModalActions';
import { SnackErrorBarData } from '../../utils/errors';

interface Props {
  open: boolean;
  onClose?: () => void;
  importTabs?: string | number;
}

const TABS_CONFIG: TabsConfig = [
  {
    key: 'UploadingSettings',
    label: 'Uploading settings'
  },
  {
    key: 'FieldMatching',
    label: 'Field matching'
  },
  {
    key: 'Duplicates',
    label: 'Duplicates'
  },
  {
    key: 'Import',
    label: 'Import'
  }
];

const ALERT_DELAY = 6000;
let ALERT_TIMEOUT: NodeJS.Timeout;

export const ImportModal: React.FC<Props> = props => {
  const importStore = useSelector((state: IStoreState) => state.import);
  const currentUser = useSelector(getUser);
  const fieldsList = importStore.formState.fields;
  const fieldsSchema = yup.mixed().oneOf(fieldsList);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, onClose, importTabs } = props;
  const {
    errorsEventEmitter,
    errorsData: { snackBarErrors },
    handleClearErrors
  } = useContext(ErrorEmitterContext);

  const REQUIRED_FIELDS: string[] = [
    'First Name',
    'Last Name',
    'Email',
    'Company',
    'Country',
    'Title',
    'Industry'
  ];
  const TABS_LIST = TABS_CONFIG.map((tabConfig: TabConfig) => tabConfig.key);
  const DEFAULT_SELECTED_TAB = importTabs || TABS_CONFIG[0].key;
  const TABS_STATE_PARAMS = {
    tabsList: TABS_LIST,
    defaultSelected: DEFAULT_SELECTED_TAB
  };

  const memoizedClasses = React.useMemo(
    () => ({
      dialog: { paper: classes.root },
      dialogContent: { root: classes.content }
    }),
    [classes.content, classes.root]
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
      origin: formValues.origin.length > 0 ? formValues.origin : undefined,
      comment: formValues.comment || undefined,
      responsible: formValues?.responsible?.key
        ? Number(formValues.responsible.key)
        : null,
      column_separator: formValues.columnSeparator.toLowerCase(),
      is_headers: Number(formValues.isHeaders),
      duplication_action: formValues.duplicationAction
    };

    dispatch(importActions.startImportingAction(data));
  };

  const checkRequiredField = () => {
    const isNC2User = Object.keys(currentUser.roles).includes('nc2');
    return REQUIRED_FIELDS.reduce((acc: string[], cur: string) => {
      if (isNC2User && !fieldsSchema.isValidSync('Job')) {
        return [...acc, 'Please select required columns: "Job"'];
      }
      if (
        fieldsSchema.isValidSync('Sequence') &&
        !fieldsSchema.isValidSync('Status')
      ) {
        return [...acc, 'Please select "Status" or skip "Sequence"'];
      }
      if (
        fieldsSchema.isValidSync('Status') &&
        !fieldsSchema.isValidSync('Sequence')
      ) {
        return [...acc, 'Please select "Sequence" or skip "Status"'];
      }
      if (
        !fieldsSchema.isValidSync('Job') &&
        fieldsSchema.isValidSync('Job skills') &&
        fieldsSchema.isValidSync('Job url') &&
        !isNC2User
      ) {
        return [
          ...acc,
          'Please select "Job" or skip "Job skills" and "Job url"'
        ];
      }
      if (
        !fieldsSchema.isValidSync('Job') &&
        fieldsSchema.isValidSync('Job skills') &&
        !isNC2User
      ) {
        return [...acc, 'Please select "Job" or skip "Job skills"'];
      }
      if (
        !fieldsSchema.isValidSync('Job') &&
        fieldsSchema.isValidSync('Job url') &&
        !isNC2User
      ) {
        return [...acc, 'Please select "Job" or skip "Job url"'];
      }
      return !fieldsSchema.isValidSync(cur)
        ? [...acc, `Please select required columns: ${cur}`]
        : [...acc];
    }, []);
  };

  const form = useFormik({
    initialValues: importStore.formState,
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  const { disabledTabs, isContinueDisabled } = React.useMemo(
    () =>
      getDisabledInfo({
        errors: Boolean(snackBarErrors.length),
        fileInfo: importStore.fileInfo,
        importStatus: importStore.importStatus
      }),
    [snackBarErrors, importStore.fileInfo, importStore.importStatus]
  );

  const handleReasetForm = React.useCallback(() => {
    form.setValues(IMPORT_FORM_INITIAL_VALUES);
    dispatch(
      setFileInfoAction({
        name: '',
        size: ''
      })
    );
  }, [dispatch, form]);

  const handleClose = React.useCallback(() => {
    if (onClose) {
      onClose();
      form.resetForm({});
      dispatch(clearFormState());
      tabsState.onChangeTab(DEFAULT_SELECTED_TAB);

      if (importStore.importStatus === 'none') {
        handleReasetForm();
      }
    }
  }, [handleReasetForm, importStore.importStatus, onClose, tabsState]);

  const handleCloseAlert = React.useCallback(() => {
    handleClearErrors();
  }, []);

  const handleCheckRequiredFieldsErr = React.useCallback(
    (selectedTab: string | number) => {
      const onlyIfErrors = [...new Set(checkRequiredField())];
      const errorsArray: JSX.Element[] = snackBarErrors.concat(
        SnackErrorBarData(onlyIfErrors)
      );
      const isError = errorsArray.length && selectedTab === 'Duplicates';
      errorsEventEmitter.emit('snackBarErrors', { errorsArray });

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
  const handleChangeTab = React.useCallback(
    (selectedTab: string | number) => {
      if (!handleCheckRequiredFieldsErr(selectedTab)) {
        tabsState.onChangeTab(selectedTab);
      }
    },
    [handleCheckRequiredFieldsErr, tabsState]
  );

  const handlePrevTab = React.useCallback(() => {
    tabsState.onPrevTab();
  }, [tabsState]);

  const handleNextTab = React.useCallback(() => {
    if (handleCheckRequiredFieldsErr(tabsState.getNextTab())) {
      return;
    }

    if (
      importStore.importStatus === 'none' &&
      tabsState.selectedTab === 'Duplicates'
    ) {
      form.handleSubmit();
    } else {
      tabsState.onNextTab();
    }
  }, [form, handleCheckRequiredFieldsErr, importStore.importStatus, tabsState]);

  const hadnleCloseStartImportMessage = React.useCallback(() => {
    dispatch(setShowStartImportMessageAction(false));
  }, [dispatch]);

  // Load data for origin, fields and column separator
  React.useEffect(() => {
    if (
      open &&
      importStore.columnSeparatorList.length === 0 &&
      importStore.originList.length === 0
    ) {
      dispatch(importActions.loadOriginListAction());
      dispatch(importActions.loadFieldsListAction());
      dispatch(importActions.loadColumnSeparatorListAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Save form state to store
  React.useEffect(() => {
    dispatch(changeImportFormStateAction(form.values));
  }, [dispatch, form.values]);

  React.useEffect(() => {
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
  React.useEffect(() => {
    if (
      (importStore?.docInfo?.headers?.length || 0) > 0 &&
      importStore.formState.fields.length === 0
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
            onClose={hadnleCloseStartImportMessage}
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
              className={classes.tabs}
              contentClassName={classes.tabContent}
              tabsConfig={TABS_CONFIG}
              defaultSelected={tabsState.selectedTab}
              selected={tabsState.selectedTab}
              disabledTabs={disabledTabs}
              onChange={handleChangeTab}
            >
              <UploadingSettings
                onFieldChange={form.handleChange}
                onSetFieldValue={form.setFieldValue}
                onClearFile={handleReasetForm}
              />
              <FieldMatching onSetFieldValue={form.setFieldValue} />
              <Duplicates onChange={form.handleChange} />
              <Import />
            </Tabs>
          </form>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <ImportModalActions
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
          onClose={hadnleCloseStartImportMessage}
        />
      ) : null}
    </>
  );
};
