import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { CommonButton, CommonInput } from 'src/view/atoms';
import {
  background,
  logoBackground,
  SET_PASSWORD_TOKEN_ERROR
} from 'src/constants';
import { sendTokenGetUser, getUser, sendPassword } from 'src/store/slices';
import { ErrorsEmitterContext } from 'src/contexts';
import {
  INVALID_PASSWORD,
  DIFFERENT_PASSWORDS,
  PASSWORD_REGEXP
} from './constants';
import { ISetPasswordFormInputs } from './interfaces';
import { useStyles } from './SetPassword.styles';

export const SetPassword = () => {
  const dispatch = useDispatch();

  const styles = useStyles();

  const checkPassword = (password: string) => {
    const matchedResult = password.match(PASSWORD_REGEXP);

    if (password === matchedResult?.[0]) {
      return password;
    }
    return 0;
  };

  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get('token');

  const { errorsEventEmitter, errorsData } = useContext(ErrorsEmitterContext);

  const user = useSelector(getUser);

  useEffect(() => {
    if (urlToken) {
      dispatch(sendTokenGetUser(urlToken, errorsEventEmitter));
    }
  }, []);

  const validate = (val: ISetPasswordFormInputs) => {
    const errors: {
      password?: string;
      passwordConfirm?: string;
    } = {};

    if (!checkPassword(`${val.password}`)) {
      errors.password = INVALID_PASSWORD;
    }

    if (val.password !== val.passwordConfirm) {
      errors.passwordConfirm = DIFFERENT_PASSWORDS;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: ''
    },
    validateOnBlur: true,
    validateOnChange: true,
    validate,
    onSubmit: () => {
      if (user?.id) {
        sendPassword(user?.id, formik.values.password);
      }
    }
  });

  const isEnableButton = (password: string, passwordConfirm: string) =>
    !(checkPassword(password) && checkPassword(passwordConfirm));

  return (
    <form
      className={styles.mainForm}
      onSubmit={formik.handleSubmit}
      style={{ background }}
    >
      <div className={styles.wrapper}>
        <div
          className={styles.logo}
          style={{
            background: logoBackground
          }}
        />

        {(errorsData.snackBarErrors.length || !urlToken) && (
          <div className={styles.errorBlock}>
            {errorsData.snackBarErrors[0] || SET_PASSWORD_TOKEN_ERROR}
          </div>
        )}
        {!errorsData.snackBarErrors.length &&
          urlToken &&
          user &&
          !user.message && (
            <div className={styles.mainBlock}>
              <div className={styles.title}>Set account password</div>
              <div className={styles.loginLabel}>
                <div className={styles.loginSubLabel1}>Your login:</div>
                <div className={styles.loginSubLabel2}>
                  {user ? user.login : ''}
                </div>
              </div>

              <div className={styles.inputBlock}>
                <div className={styles.inputBig}>
                  <CommonInput
                    name='password'
                    placeholder='Create the password'
                    width='360px'
                    type='password'
                    errorMessage={formik.errors.password}
                    onChangeValue={formik.handleChange}
                  />
                </div>
                <div className={styles.input}>
                  <CommonInput
                    name='passwordConfirm'
                    placeholder='Confirm the password'
                    width='360px'
                    type='password'
                    errorMessage={formik.errors.passwordConfirm}
                    onChangeValue={formik.handleChange}
                  />
                </div>

                <div className={styles.helperText}>
                  The password must be between 6 and 12 characters long. The
                  password must consist of letters of the Latin alphabet (a-z)
                  and Arabic numerals (0-9). The password must contain at least
                  one uppercase letter, one lowercase and one digit.
                </div>

                <CommonButton
                  size='big'
                  color='yellow'
                  text='Continue'
                  disabled={isEnableButton(
                    formik.values.password,
                    formik.values.passwordConfirm
                  )}
                  type='submit'
                />
              </div>
            </div>
          )}

        {user && user.message && (
          <div>
            <div className={styles.infoBlock}>
              <div className={styles.info}>{user.message}</div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default SetPassword;
