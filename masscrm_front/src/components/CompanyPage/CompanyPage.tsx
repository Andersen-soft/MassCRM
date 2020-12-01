import React from 'react';

import { styleNames } from 'src/services';
import { Header } from '../common/Header';
import { LeftColumn } from './components/LeftColumn';
import { RightColumn } from './components/RightColumn';
import { Footer } from './components/Footer';

import style from './CompanyPage.scss';

const sn = styleNames(style);

export const CompanyPage = () => {
  return (
    <>
      <Header />
      <div className={sn('mainContainer')}>
        <LeftColumn />
        <RightColumn />
        <Footer />
      </div>
    </>
  );
};

export default CompanyPage;
