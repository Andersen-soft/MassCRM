import React from 'react';
import { useLocation } from 'react-router-dom';
import { PageAttachments, Header, ToggleBlock } from 'src/view/organisms';
import { InfoPart, ActivityLog } from './components';

export const ContactPage = () => {
  const { search } = useLocation();

  const contactId = Number(new URLSearchParams(search).get('id'));

  return (
    <>
      <Header />
      <div className='container'>
        <InfoPart id={contactId} />
        <ToggleBlock label='Attachment'>
          <PageAttachments id={contactId} name='contact' />
        </ToggleBlock>
        <ToggleBlock label='Activity log'>
          <ActivityLog id={contactId} />
        </ToggleBlock>
      </div>
    </>
  );
};

export default ContactPage;
