import React, { FC } from 'react';
import { Header, ToggleBlock } from 'src/components/common';
import { useLocation } from 'react-router-dom';
import { ContactAttachments, ContactActivityLog, InfoPart } from './components';

export const ContactPage: FC = () => {
  const location = useLocation();
  const contactId = Number(new URLSearchParams(location.search).get('id'));

  return (
    <>
      <Header />
      <div className='container'>
        <InfoPart id={contactId} />
        <ToggleBlock label='Attachment'>
          <ContactAttachments id={contactId} />
        </ToggleBlock>
        <ToggleBlock label='Activity log'>
          <ContactActivityLog id={contactId} />
        </ToggleBlock>
      </div>
    </>
  );
};
