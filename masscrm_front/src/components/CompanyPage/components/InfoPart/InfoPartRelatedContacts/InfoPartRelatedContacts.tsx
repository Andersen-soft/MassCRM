import React, { FC, useCallback, useState } from 'react';
import { IContactResult } from 'src/interfaces';
import { CommonButton } from 'src/components/common';
import { styleNames } from 'src/services';
import { InfoPartNoItems } from '..';

import style from './InfoPartRelatedContacts.scss';
import { AddRelatedContactModal } from '../..';

const sn = styleNames(style);

export const InfoPartRelatedContacts: FC<{
  contacts: Array<IContactResult>;
  companyId: number;
  fetchRelatedContacts: Function;
}> = ({ contacts, companyId, fetchRelatedContacts }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggleAddRelatedContactForm = useCallback(
    () => setOpen((val: boolean) => !val),
    [setOpen]
  );

  return (
    <>
      <div className={sn('wrapper')}>
        {contacts.length ? (
          <div className={sn('wrapper-contacts')}>
            <div className={sn('title')}>Related contacts:</div>
            <div
              className={`${sn('contact-block')} ${contacts.length > 5 &&
                sn('spaceBetween')}`}
            >
              {contacts.map(({ id, first_name, last_name, full_name }) => (
                <a
                  className={sn('contact')}
                  key={id}
                  href={`/contact?id=${id}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {full_name ||
                    `${first_name || ''}${last_name ? ' ' : ''}${last_name ||
                      ''}`}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <InfoPartNoItems items='related contacts' />
        )}
        <CommonButton
          text='Add new contact'
          onClickHandler={handleToggleAddRelatedContactForm}
          align='alignRight'
        />
      </div>
      {open && (
        <AddRelatedContactModal
          handleClose={handleToggleAddRelatedContactForm}
          open={open}
          companyId={companyId}
          fetchRelatedContacts={fetchRelatedContacts}
        />
      )}
    </>
  );
};
