import React, { FC, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { CommonInput, CommonButton } from 'src/components/common';
import { applicationPath } from 'src/data/params';
import sendPassword from 'src/services/sendPassword';
import { sendTokenGetUser } from 'src/actions/sendTokenGetUser';
import { checkPassword } from 'src/services/checkPassword';
import { ISetPasswordFormInputs } from 'src/components/SetPassword/interfaces';
import { getUser } from 'src/selectors';
import { styleNames } from 'src/services';
import styles from './SetPassword.scss';

const sn = styleNames(styles);

export const SetPassword: FC = () => {
  const dispatch = useDispatch();

  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get('token');

  const [background, logoBackground] = useMemo(
    () => [
      `url(${applicationPath}/assets/img/backgroung.png) center/100%  no-repeat`,
      `url(${applicationPath}/assets/img/logo.png) 100%  no-repeat`
    ],
    []
  );

  const user = useSelector(getUser);

  useEffect(() => {
    if (urlToken) {
      dispatch(sendTokenGetUser(urlToken));
    }
  }, []);

  const validate = (val: ISetPasswordFormInputs) => {
    const errors: {
      password?: string;
      passwordConfirm?: string;
    } = {};

    if (!checkPassword(String(val.password))) {
      errors.password = 'Invalid password';
    }

    if (val.password !== val.passwordConfirm) {
      errors.passwordConfirm = 'Different passwords';
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
        dispatch(sendPassword(user?.id, formik.values.password));
      }
    }
  });

  const isEnableButton = (password: string, passwordConfirm: string) =>
    !(checkPassword(password) && checkPassword(passwordConfirm));

  return (
    <form
      className={sn('mainForm')}
      onSubmit={formik.handleSubmit}
      style={{ background }}
    >
      <div className={sn('wrapper')}>
        <div
          className={sn('logo')}
          style={{
            background: logoBackground
          }}
        />

        {user && !user.message && (
          <div className={sn('mainBlock')}>
            <div className={sn('title')}>Set account password</div>
            <div className={sn('loginLabel')}>
              <div className={sn('loginSubLabel1')}>Your login:</div>
              <div className={sn('loginSubLabel2')}>
                {user ? user.login : ''}
              </div>
            </div>

            <div className={sn('inputBlock')}>
              <div className={sn('input-big')}>
                <CommonInput
                  name='password'
                  placeholder='Create the password'
                  width='360px'
                  type='password'
                  errorMessage={formik.errors.password}
                  onChangeValue={formik.handleChange}
                />
              </div>
              <div className={sn('input')}>
                <CommonInput
                  name='passwordConfirm'
                  placeholder='Confirm the password'
                  width='360px'
                  type='password'
                  errorMessage={formik.errors.passwordConfirm}
                  onChangeValue={formik.handleChange}
                />
              </div>

              <div className={sn('helperText')}>
                Password must be between 6 and 12 characters long. The password
                must consist of letters of the Latin alphabet (a-z) and Arabic
                numerals (0-9).
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
            <div className={sn('infoBlock')}>
              <div className={sn('info')}>{user.message}</div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default SetPassword;
