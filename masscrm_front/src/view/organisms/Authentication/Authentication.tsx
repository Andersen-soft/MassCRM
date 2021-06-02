import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { getUserData } from 'src/store/slices';
import { background, logoBackground } from 'src/constants';
import { ErrorsEmitterContext } from 'src/contexts';
import { CommonAlert, CommonButton, CommonInput } from 'src/view/atoms';
import { LoginSchema } from 'src/utils';
import { useStyles } from './Authentication.styles';

export const Authentication = () => {
  const dispatch = useDispatch();

  const styles = useStyles();

  const [open, setOpen] = useState(false);

  const {
    errorsEventEmitter,
    errorsData: { snackBarErrors },
    handleClearErrors
  } = useContext(ErrorsEmitterContext);

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
    },
    validationSchema: LoginSchema
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.wrapper} style={{ background }}>
        <div className={styles.logo} style={{ background: logoBackground }} />

        <div className={styles.mainBlock}>
          <div className={styles.title}>Log in</div>

          <div className={styles.inputBlock}>
            <div className={styles.input}>
              <CommonInput
                value={formik.values.login}
                name='login'
                type='text'
                placeholder='Login'
                width='312px'
                onChangeValue={formik.handleChange}
                errorMessage={
                  formik.touched.login ? formik.errors.login : undefined
                }
              />
            </div>

            <div className={styles.inputBig}>
              <CommonInput
                value={formik.values.password}
                name='password'
                placeholder='Password'
                width='312px'
                type='password'
                onChangeValue={formik.handleChange}
                errorMessage={
                  formik.touched.password ? formik.errors.password : undefined
                }
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
