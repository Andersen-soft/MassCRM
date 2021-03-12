import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { Header } from 'src/components/common';
import { TablePanel, ReportTable } from './components';

import style from './ReportPage.scss';

const sn = styleNames(style);

export const ReportPage: FC<{
  reportPage: boolean;
}> = ({ reportPage }) => {
  return (
    <>
      <Header />
      <div className='container'>
        <div className={sn('wrapper')}>
          <div className={sn('data')}>
            <TablePanel />
            <div className={sn('main-section')}>
              <ReportTable reportPage={reportPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
