import React from 'react';
import { CommonIcon } from 'src/view/atoms';
import gears from 'assets/svg/gears.svg';
import refresh from 'assets/svg/refresh.svg';
import { background, logoBackground } from 'src/constants';
import { useStyles } from './ErrorPage.styles';

export const ErrorPage = () => {
  const handleReloadPage = () => {
    window.location.href = document.referrer;
  };

  const styles = useStyles();

  return (
    <>
      <div className={styles.wrapper} style={{ background }}>
        <div className={styles.logo} style={{ background: logoBackground }} />
        <div className={styles.mainBlock}>
          <CommonIcon IconComponent={gears} />
          <p className={styles.info}>
            Sorry, we are doing some technical work on the site. Thank you for
            being patient, the site will be back shortly.
          </p>
          <button
            type='button'
            className={styles.button}
            onClick={handleReloadPage}
          >
            <span className={styles.buttonSpan}>Reload Page</span>
            <CommonIcon IconComponent={refresh} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
