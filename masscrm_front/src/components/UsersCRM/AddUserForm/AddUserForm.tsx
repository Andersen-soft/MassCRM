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
import {
  CommonInput,
  CommonButton,
  CustomTextarea,
  CustomSwitch,
  SearchInput,
  CustomSelect
} from 'src/components/common';
import { CommonAlert } from 'src/components/common/CommonAlert';
import { CloseModal } from 'src/components/UsersCRM/AddUserForm/CloseModal';
import {
  getLdapUsers,
  getUsers,
  getRoles,
  getErrors
} from 'src/selectors/user.selector';
import {
  getLdapUser,
  postAddUser,
  patchUser,
  getRolesDispatch
} from 'src/actions/user.action';
import { IUser } from 'src/interfaces';
import { getRolesText } from 'src/utils/roles/getRolesText';
import { useStyles } from 'src/components/UsersCRM/AddUserForm/AddUserForm.styles';
import { RolesInfo } from './RolesInfo';
import { addUserFormSchema } from '../../../utils/form/validate';

interface IAddUserFormProps {
  id?: number;
  handleClose: () => void;
}

export interface IAddUserFormInputs {
  [index: string]: string | Array<string> | undefined | boolean;
  email?: string;
  login?: string;
  name?: string;
  surname?: string;
  roles?: Array<string>;
  skype?: string;
  position?: string;
  comment?: string;
  active?: boolean;
  fromActiveDirectory?: boolean;
}

interface IRolesDisplay {
  [key: string]: string;
}

const rolesDisplay: IRolesDisplay = {
  Admin: 'administrator',
  Manager: 'manager',
  NC1: 'nc1',
  NC2: 'nc2'
};

const INITIAL_VALUES = {
  email: '',
  login: '',
  name: '',
  surname: '',
  roles: [],
  position: '',
  skype: '',
  comment: '',
  active: true,
  fromActiveDirectory: false
};

export const AddUserForm: FC<IAddUserFormProps> = props => {
  const dispatch = useDispatch();

  const { id, handleClose } = props;

  const allUsers = useSelector(getUsers);

  const ldapUsers = useSelector(getLdapUsers);
  const roles = useSelector(getRoles);
  const errorsText = useSelector(getErrors);

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const classes = useStyles();

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = useCallback(
    (event: SyntheticEvent<Element, Event>, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
    },
    []
  );

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClickClose = useCallback(() => {
    setOpen(false);
  }, []);

  const currentUser = useSelector(getUsers)[
    Object.keys(allUsers).join()
  ].filter((item: IUser) => item.id === id);

  const emailLdap = useMemo(
    () => (ldapUsers ? ldapUsers?.map((item: IUser) => item?.email || '') : []),
    [ldapUsers]
  );

  const submitHandler = useCallback((formState: IAddUserFormInputs) => {
    const userRoles = formState?.roles?.map(
      (role: string) => rolesDisplay[role]
    );
    const data = { ...formState, roles: userRoles };
    if (id) {
      dispatch(
        patchUser(
          data,
          id,
          Number(Object.keys(allUsers).join()),
          handleClickAlert,
          handleClose
        )
      );
    } else {
      dispatch(
        postAddUser(
          data,
          Number(Object.keys(allUsers).join()),
          handleClickAlert,
          handleClose
        )
      );
    }
  }, []);

  const RolesText = useMemo(() => getRolesText(roles), [roles]);

  const currentUserRolesText = useMemo(() => {
    if (id) {
      return getRolesText(currentUser[0].roles);
    }
    return [];
  }, [currentUser]);

  const initialValues = id
    ? {
        email: currentUser[0].email,
        login: currentUser[0].login,
        name: currentUser[0].name,
        surname: currentUser[0].surname,
        roles: currentUserRolesText,
        position: currentUser[0].position,
        skype: currentUser[0].skype,
        comment: currentUser[0].comment,
        active: currentUser[0].active,
        fromActiveDirectory: currentUser[0].fromActiveDirectory
      }
    : INITIAL_VALUES;

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: submitHandler,
    validationSchema: addUserFormSchema
  });

  const handleCheckOpen = useCallback(() => {
    if (
      id ||
      (formik.values.email === '' &&
        formik.values.login === '' &&
        formik.values.name === '' &&
        formik.values.surname === '' &&
        formik.values.roles?.length === 0 &&
        formik.values.position === '' &&
        formik.values.skype === '' &&
        formik.values.comment === '')
    ) {
      handleClose();
    } else {
      handleClickOpen();
    }
  }, [formik.values]);

  const errorMessage = useMemo(() => {
    if (errorsText) {
      const texts = Object.values(errorsText);
      return texts.join(' ');
    }
    return '';
  }, [errorsText]);

  useEffect(() => {
    dispatch(getLdapUser(String(formik.values.email)));
  }, [dispatch, formik.values.email]);

  const onChangeEmail = useCallback(async (val: string) => {
    formik.setFieldValue('email', val);
  }, []);

  const onChangeRoles = useCallback(async (val: Array<string>) => {
    formik.setFieldValue('roles', val);
  }, []);

  useEffect(() => {
    if (ldapUsers?.length === 1) {
      formik.setFieldValue('fromActiveDirectory', true);
      formik.setFieldValue('name', ldapUsers[0].name);
      formik.setFieldValue('surname', ldapUsers[0].surname);
      formik.setFieldValue('login', ldapUsers[0].login);
    }
    if (!ldapUsers.length) {
      formik.setFieldValue('fromActiveDirectory', false);
      formik.setFieldValue('name', initialValues.name);
      formik.setFieldValue('surname', initialValues.surname);
      formik.setFieldValue('login', initialValues.login);
    }
  }, [ldapUsers]);

  useEffect(() => {
    dispatch(getRolesDispatch());
  }, []);

  return (
    <div>
      <form className={classes.mainForm} onSubmit={formik.handleSubmit}>
        <div className={classes.title}>
          {id ? 'Edit user’s info' : 'Add user'}
        </div>
        <div className={classes.info}>
          {id
            ? "A new user can log in using Kerio Andersen's corporate login and password if the one was registered by the corporate email"
            : 'In case of using corporate e-mail, a new user will be able to log in using the Andersen corporate login and password'}
        </div>

        <div className={classes.inputsBlock}>
          <SearchInput
            name='email'
            value={formik.values.email}
            items={emailLdap || []}
            placeholder='Email *'
            disabled={!!id && formik.values.fromActiveDirectory}
            width='270px'
            onChange={onChangeEmail}
            errorMessage={formik.errors.email}
          />
          <CustomSelect
            name='roles'
            items={RolesText || []}
            placeholder='Roles'
            multi
            onChange={onChangeRoles}
            value={formik.values.roles}
            errorMessage={formik.errors.roles}
            width='270px'
            inputClassName={classes.customNativeInput}
            information={<RolesInfo />}
          />
          <CommonInput
            name='login'
            value={formik.values.login}
            placeholder='Login'
            width='270px'
            disabled={
              (!!id || Boolean(ldapUsers?.length)) &&
              formik.values.fromActiveDirectory
            }
            onChangeValue={formik.handleChange}
            errorMessage={formik.errors.login}
          />
          <CommonInput
            name='position'
            value={formik.values.position}
            placeholder='Title'
            width='270px'
            onChangeValue={formik.handleChange}
          />
          <CommonInput
            name='name'
            value={formik.values.name}
            placeholder='Name'
            width='270px'
            onChangeValue={formik.handleChange}
            errorMessage={formik.errors.name}
          />
          <CommonInput
            name='skype'
            value={formik.values.skype}
            placeholder='Skype'
            width='270px'
            onChangeValue={formik.handleChange}
            errorMessage={formik.errors.skype}
          />
          <CommonInput
            name='surname'
            value={formik.values.surname}
            placeholder='Surname'
            width='270px'
            onChangeValue={formik.handleChange}
            errorMessage={formik.errors.surname}
          />
        </div>

        <div className={classes.textAreaWrapper}>
          <CustomTextarea
            name='comment'
            value={formik.values.comment}
            placeholder='Type a text'
            onChange={formik.handleChange}
            width='230px'
          />
        </div>

        <div className={classes.switchBlock}>
          <div>Status</div>

          <div className={classes.switchRow}>
            <div>Not active</div>
            <CustomSwitch
              name='active'
              value={Boolean(formik.values.active)}
              onChangeHandler={formik.handleChange}
            />
            <div>Active</div>
          </div>
        </div>

        <div className={classes.buttonsWrapper}>
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
