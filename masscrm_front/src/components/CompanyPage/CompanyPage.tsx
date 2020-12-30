import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, ToggleBlock } from 'src/components/common';
import { InfoPart, CompanyAttachments, CompanyActivityLog } from './components';

export const CompanyPage: FC = () => {
  const location = useLocation();
  const companyId = Number(new URLSearchParams(location.search).get('id'));

  return (
    <>
      <Header />
      <div className='container'>
        <InfoPart id={companyId} />
        <ToggleBlock label='Attachments'>
          <CompanyAttachments id={companyId} />
        </ToggleBlock>
        <ToggleBlock label='Activity log'>
          <CompanyActivityLog id={companyId} />
        </ToggleBlock>
      </div>
    </>
  );
};

export default CompanyPage;
