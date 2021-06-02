import React from 'react';
import { Header } from 'src/view/organisms';
import { Filters, TitlePanel, UsersInfo, ReturnToNCModal } from './components';
import { useStyles } from './ReviewPage.styles';

export interface IMock {
  [key: string]: string | number;
  user: string;
  date: string;
  total: number;
}

export const ReviewPage = () => {
  // TODO replace by real data when backend will be implemented
  const mockBlocksData: IMock[] = [
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 },
    { user: 'name', date: '21.07.2020', total: 30 }
  ];

  const styles = useStyles();

  return (
    <>
      <Header />
      <div className='container'>
        <div className={styles.wrapper}>
          <div className={styles.data}>
            <TitlePanel />
            <div className={styles.mainSection}>
              <Filters />
              <UsersInfo usersInfo={mockBlocksData} />
              {/* TODO replace by real methods on the stage of implementing functionality */}
              <ReturnToNCModal handleClose={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
