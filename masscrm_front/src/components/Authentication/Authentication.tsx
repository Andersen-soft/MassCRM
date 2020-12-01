import React, { FC, useState, useMemo, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { CommonInput, CommonButton } from 'src/components/common';
import { getUserData } from 'src/actions/user.action';
import { applicationPath } from 'src/data/params';
import { styleNames } from 'src/services';
import { ErrorEmitterContext } from 'src/context';
import styles from './Authentication.scss';
import { CommonAlert } from '../common/CommonAlert';

const sn = styleNames(styles);

export const Authentication: FC = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const {
    errorsEventEmitter,
    errorsData: { snackBarErrors },
    handleClearErrors
  } = useContext(ErrorEmitterContext);
  const [background, logoBackground] = useMemo(
    () => [
      `url(${applicationPath}/assets/img/backgroung.png) center/100%  no-repeat`,
      `url(${applicationPath}/assets/img/logo.png) 100%  no-repeat`
    ],
    []
  );

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleClearErrors();
  };

  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    onSubmit: async () => {
      dispatch(
        getUserData({
          login: formik.values.login,
          password: formik.values.password,
          handle: handleClick,
          errorsEventEmitter
        })
      );
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={sn('wrapper')} style={{ background }}>
        <div className={sn('logo')} style={{ background: logoBackground }} />

        <div className={sn('mainBlock')}>
          <div className={sn('title')}>Log in</div>

          <div className={sn('inputBlock')}>
            <div className={sn('input')}>
              <CommonInput
                name='login'
                type='text'
                placeholder='Login'
                width='312px'
                onChangeValue={formik.handleChange}
              />
            </div>

            <div className={sn('input-big')}>
              <CommonInput
                name='password'
                placeholder='Password'
                width='312px'
                type='password'
                onChangeValue={formik.handleChange}
              />
            </div>

            <CommonButton
              size='big'
              color='yellow'
              text='Log in'
              type='submit'
            />
          </div>
        </div>
      </div>
      <CommonAlert
        open={open}
        onClose={handleClose}
        errorMessage={snackBarErrors}
        type='error'
      />
    </form>
  );
};
