import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { CommonIcon } from 'src/components/common';
import gears from 'assets/svg/gears.svg';
import refresh from 'assets/svg/refresh.svg';
import { applicationPath } from 'src/data/params';
import styles from './ErrorPage.scss';

const sn = styleNames(styles);
const background = `url(${applicationPath}/assets/img/backgroung.png) center/100%  no-repeat`;
const logoBackground = `url(${applicationPath}/assets/img/logo.png) 100%  no-repeat`;

export const ErrorPage: FC = () => {
  const handleReloadPage = () => {
    window.location.href = document.referrer;
  };

  return (
    <>
      <div className={sn('wrapper')} style={{ background }}>
        <div className={sn('logo')} style={{ background: logoBackground }} />
        <div className={sn('mainBlock')}>
          <CommonIcon IconComponent={gears} />
          <p className={sn('info')}>
            Sorry, we are doing some technical work on the site. Thank you for
            being patient, the site will be back shortly.
          </p>
          <button
            type='button'
            className={sn('button')}
            onClick={handleReloadPage}
          >
            <span>Reload Page</span>
            <CommonIcon IconComponent={refresh} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
