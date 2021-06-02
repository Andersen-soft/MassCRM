import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header, PageAttachments, ToggleBlock } from 'src/view/organisms';
import { InfoPart, ActivityLog } from './components';

export const CompanyPage = () => {
  const { search } = useLocation();

  const companyId = Number(new URLSearchParams(search).get('id'));

  return (
    <>
      <Header />
      <div className='container'>
        <InfoPart id={companyId} />
        <ToggleBlock label='Attachments'>
          <PageAttachments id={companyId} name='company' />
        </ToggleBlock>
        <ToggleBlock label='Activity log'>
          <ActivityLog id={companyId} />
        </ToggleBlock>
      </div>
    </>
  );
};

export default CompanyPage;
