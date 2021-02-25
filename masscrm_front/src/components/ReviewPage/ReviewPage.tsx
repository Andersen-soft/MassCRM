import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { Header } from 'src/components/common';
import { TitlePanel, Filters, UsersInfo, ReturnToNCModal } from './components';

import style from './ReviewPage.scss';

const sn = styleNames(style);

export interface IMock {
  [key: string]: string | number;
  user: string;
  date: string;
  total: number;
}

export const ReviewPage: FC<{}> = () => {
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

  return (
    <>
      <Header />
      <div className='container'>
        <div className={sn('wrapper')}>
          <div className={sn('data')}>
            <TitlePanel />
            <div className={sn('main-section')}>
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
