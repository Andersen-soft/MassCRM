import React from 'react';
import { Header } from 'src/view/organisms';
import { Table, Title } from './components';
import { useStyles } from './UserCRM.styles';

export const UsersCRM = () => {
  const styles = useStyles();

  return (
    <>
      <Header />
      <div className={styles.usersWrapper}>
        <Title />
        <Table />
      </div>
    </>
  );
};

export default UsersCRM;
