import React, {
  FC,
  useEffect,
  useMemo,
  useCallback,
  useState,
  SyntheticEvent
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { debounce } from 'lodash';
import {
  CommonAlert,
  CommonButton,
  CommonInput,
  CustomSelect,
  CustomSwitch,
  CustomTextarea
} from 'src/view/atoms';
import {
  getLdapUsers,
  getUsersSelector,
  getRolesSelector,
  getErrors,
  getCurrentPage,
  getUsersFiltersValues,
  fetchLdapUser,
  postAddUser,
  patchUser,
  getRolesDispatch
} from 'src/store/slices';
import {
  IUser,
  IUserFormInputs,
  IUsersFiltersRequestValues
} from 'src/interfaces';
import { STATUSES } from 'src/constants';
import {
  getRolesText,
  addUserFormSchema,
  getRolesValuesForRequest
} from 'src/utils';
import { SearchInput } from 'src/view/organisms';
import {
  AUTH_USING_CORP_EMAIL,
  INITIAL_VALUES,
  LOGIN_OF_AUTH_USER,
  rolesDisplay
} from './constants';
import { RolesInfo, CloseModal } from './components';
import { useStyles } from './AddUserForm.styles';

interface IProps {
  id?: number;
  handleClose: () => void;
}

export const AddUserForm: FC<IProps> = ({ id, handleClose }) => {
  const dispatch = useDispatch();

  const ldapUsers = useSelector(getLdapUsers);
  const roles = useSelector(getRolesSelector);
  const currentPage = useSelector(getCurrentPage);
  const errorsText = useSelector(getErrors);
  const usersFiltersState = useSelector(getUsersFiltersValues);

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedLdapUserEmail, setSelectedLdapUserEmail] = useState('');

  const styles = useStyles();

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = useCallback(
    (_: SyntheticEvent<Element, Event>, reason?: string) => {
      if (reason === 'clickaway') return;

      setOpenAlert(false);
    },
    []
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = useCallback(() => {
    setOpen(false);
  }, []);

  const currentUser = useSelector(getUsersSelector).filter(
    (item: IUser) => item.id === id
  );

  const emailLdap = useMemo(
    () =>
      ldapUsers
        .map((item: IUser) => item?.email || '')
        .filter((item: string) => item),
    [ldapUsers]
  );

  const getStatusValuesForRequest = (status: string) => STATUSES[status];

  const requestValues: IUsersFiltersRequestValues = useMemo(
    () => ({
      fullName: usersFiltersState.fullName || undefined,
      email: usersFiltersState.email || undefined,
      login: usersFiltersState.login || undefined,
      roles: getRolesValuesForRequest(usersFiltersState.roles),
      skype: usersFiltersState.skype || undefined,
      position: usersFiltersState.position || undefined,
      active: getStatusValuesForRequest(usersFiltersState.status)
    }),
    [usersFiltersState]
  );

  const submitHandler = useCallback(
    (formState: IUserFormInputs) => {
      const userRoles = formState?.roles?.map(
        (role: string) => rolesDisplay[role]
      );
      const data = { ...formState, roles: userRoles };

      if (id) {
        dispatch(
          patchUser({
            user: data,
            id,
            currentPage,
            filter: requestValues,
            handleAlert: handleClickAlert,
            handleClose
          })
        );
        return;
      }
      dispatch(
        postAddUser({
          user: data,
          currentPage,
          filter: requestValues,
          handleAlert: handleClickAlert,
          handleClose
        })
      );
    },
    [usersFiltersState]
  );

  const rolesOptions = useMemo(() => getRolesText(roles).filter(role => role), [
    roles
  ]);

  const currentUserRolesText = useMemo(
    () => (id ? getRolesText(currentUser[0].roles) : []),
    [currentUser]
  );

  const setInitialValues = (currUser: IUser, ...keys: string[]) =>
    keys.reduce((acc, key) => ({ ...acc, [key]: currUser[key] || '' }), {});

  const initialValues = id
    ? {
        ...setInitialValues(
          currentUser[0],
          'email',
          'login',
          'name',
          'surname',
          'position',
          'skype',
          'comment',
          'active',
          'fromActiveDirectory'
        ),
        roles: currentUserRolesText || []
      }
    : INITIAL_VALUES;

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: submitHandler,
    validationSchema: addUserFormSchema
  });

  const {
    values: {
      email,
      login,
      name,
      surname,
      roles: formikRoles,
      position,
      skype,
      comment,
      fromActiveDirectory,
      active
    }
  } = formik;

  const areAllFieldsEmpty = (
    ...fieldValues: (string | boolean | number | undefined)[]
  ) => fieldValues.every((val: string | boolean | number | undefined) => !val);

  const handleCheckOpen = useCallback(() => {
    if (
      id ||
      areAllFieldsEmpty(
        email,
        login,
        name,
        surname,
        formikRoles?.length,
        position,
        skype,
        comment
      )
    ) {
      return handleClose();
    }
    return handleClickOpen();
  }, [email, login, name, surname, formikRoles, position, skype, comment]);

  const errorMessage = useMemo(
    () => (errorsText ? Object.values(errorsText).join(' ') : ''),
    [errorsText]
  );

  const getLdapUser = (val: string) =>
    ldapUsers.find(({ email: ldapUserEmail }): any => ldapUserEmail === val) ||
    ({} as IUser);

  const setMultipleLdapFieldsValues = (
    value: string,
    ...fieldNames: string[]
  ) => {
    fieldNames.forEach((fieldName: string) => {
      const ldapUser = value ? getLdapUser(value) : ({} as IUser);

      formik.setFieldValue(fieldName, value ? ldapUser[fieldName] : '');
    });
  };

  const onChangeEmail = useCallback(
    debounce((val: string) => {
      formik.setFieldValue('email', val || '');

      if (val) {
        dispatch(fetchLdapUser(val));

        if (getLdapUser(val).email !== val) {
          selectedLdapUserEmail &&
            setMultipleLdapFieldsValues('', 'name', 'surname', 'login');

          setSelectedLdapUserEmail('');

          formik.setFieldValue('fromActiveDirectory', false);
        }
      }
    }, 500),
    [ldapUsers]
  );

  const onChangeRoles = useCallback(async (val: string[]) => {
    formik.setFieldValue('roles', val || []);
  }, []);

  const onSelectEmail = (val: string | null) => {
    if (val) {
      if (getLdapUser(val).email === val) {
        formik.setFieldValue('fromActiveDirectory', true);
        setSelectedLdapUserEmail(val);
        setMultipleLdapFieldsValues(val, 'name', 'surname', 'login');

        return;
      }
    }

    fromActiveDirectory &&
      setMultipleLdapFieldsValues('', 'name', 'surname', 'login', 'email');

    setSelectedLdapUserEmail('');
  };

  useEffect(() => {
    dispatch(getRolesDispatch());
  }, []);

  return (
    <div>
      <form className={styles.mainForm} onSubmit={formik.handleSubmit}>
        <div className={styles.title}>
          {id ? 'Edit user’s info' : 'Add user'}
        </div>
        <div className={styles.info}>
          {id ? LOGIN_OF_AUTH_USER : AUTH_USING_CORP_EMAIL}
        </div>

        <div className={styles.inputsBlock}>
          <div className={styles.inputBlock}>
            <SearchInput
              name='email'
              value={email}
              items={emailLdap}
              placeholder='Email *'
              disabled={!!id && fromActiveDirectory}
              width='270px'
              onChange={onChangeEmail}
              onSelect={onSelectEmail}
              errorMessage={
                formik.touched.email ? formik.errors.email : undefined
              }
            />
          </div>
          <div className={styles.inputBlock}>
            <CustomSelect
              name='roles'
              items={rolesOptions}
              placeholder='Roles *'
              multi
              onChange={onChangeRoles}
              value={formikRoles}
              errorMessage={
                formik.touched.roles ? formik.errors.roles : undefined
              }
              width='270px'
              inputClassName={styles.customNativeInput}
              information={<RolesInfo />}
            />
          </div>
          <div className={styles.inputBlock}>
            <CommonInput
              name='login'
              value={login}
              placeholder='Login *'
              width='270px'
              disabled={fromActiveDirectory}
              onChangeValue={formik.handleChange}
              errorMessage={
                formik.touched.login ? formik.errors.login : undefined
              }
            />
          </div>
          <div className={styles.inputBlock}>
            <CommonInput
              name='position'
              value={position}
              placeholder='Title'
              width='270px'
              onChangeValue={formik.handleChange}
            />
          </div>
          <div className={styles.inputBlock}>
            <CommonInput
              name='name'
              value={name}
              placeholder='Name *'
              width='270px'
              onChangeValue={formik.handleChange}
              errorMessage={
                formik.touched.name ? formik.errors.name : undefined
              }
            />
          </div>
          <div className={styles.inputBlock}>
            <CommonInput
              name='skype'
              value={skype}
              placeholder='Skype *'
              width='270px'
              onChangeValue={formik.handleChange}
              errorMessage={
                formik.touched.skype ? formik.errors.skype : undefined
              }
            />
          </div>
          <div className={styles.inputBlock}>
            <CommonInput
              name='surname'
              value={surname}
              placeholder='Surname *'
              width='270px'
              onChangeValue={formik.handleChange}
              errorMessage={
                formik.touched.surname ? formik.errors.surname : undefined
              }
            />
          </div>
        </div>

        <div className={styles.textAreaWrapper}>
          <CustomTextarea
            name='comment'
            value={comment}
            placeholder='Type a text'
            onChange={formik.handleChange}
            width='230px'
          />
        </div>

        <div className={styles.switchBlock}>
          <div>Status</div>

          <div className={styles.switchRow}>
            <div>Not active</div>
            <CustomSwitch
              name='active'
              value={!!active}
              onChangeHandler={formik.handleChange}
            />
            <div>Active</div>
          </div>
        </div>

        <div className={styles.buttonsWrapper}>
          <CommonButton
            size='big'
            color='white'
            text='Cancel'
            onClickHandler={handleCheckOpen}
          />
          <CommonButton type='submit' size='big' color='yellow' text='Save' />
        </div>
      </form>

      <CloseModal
        open={open}
        onCloseCheck={handleClickClose}
        onClose={handleClose}
      />

      <CommonAlert
        open={openAlert}
        onClose={handleCloseAlert}
        errorMessage={errorMessage}
        type='error'
      />
    </div>
  );
};
