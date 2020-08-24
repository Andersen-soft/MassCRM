import React, { FC, useState, useMemo, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { CommonInput, CommonButton } from 'src/components/common';
import { getUserData } from 'src/actions/user.action';
import { applicationPath } from 'src/data/params';
import { styleNames } from 'src/services';
import styles from './Authentication.scss';

const sn = styleNames(styles);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export const Authentication: FC = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

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

  const handleClose = (
    event: SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    onSubmit: async () => {
      dispatch(
        await getUserData({
          login: formik.values.login,
          password: formik.values.password,
          handle: handleClick
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

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error'>
          Incorrect login or password.
        </Alert>
      </Snackbar>
    </form>
  );
};
