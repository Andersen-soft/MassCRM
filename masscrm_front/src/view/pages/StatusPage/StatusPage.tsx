import React, { FC } from 'react';
import { Header } from 'src/view/organisms';
import { configs } from './configs';
import { Table } from './components';
import { useStyles } from './StatusPage.styles';

interface IProps {
  isImport?: boolean;
}

export const StatusPage: FC<IProps> = ({ isImport }) => {
  const currentConfig = isImport
    ? configs.importMethods
    : configs.exportMethods;

  const styles = useStyles();

  return (
    <>
      <Header />
      <div className='container'>
        <div className={styles.status}>
          <Table {...currentConfig} isImport={isImport} />
        </div>
      </div>
    </>
  );
};

export default StatusPage;
