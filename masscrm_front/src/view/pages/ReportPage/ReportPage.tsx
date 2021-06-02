import React, { FC } from 'react';
import { Header } from 'src/view/organisms';
import { Table } from './components';
import { useStyles } from './ReportPage.styles';

interface IProps {
  reportPage: boolean;
}

export const ReportPage: FC<IProps> = ({ reportPage }) => {
  const styles = useStyles();

  return (
    <>
      <Header />
      <div className='container'>
        <div className={styles.wrapper}>
          <div className={styles.data}>
            {/* <div className={sn('main-section')}> */}
            <Table reportPage={reportPage} />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
