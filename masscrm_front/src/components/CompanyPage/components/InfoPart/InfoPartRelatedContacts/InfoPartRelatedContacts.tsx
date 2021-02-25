import React, { FC, useCallback, useState } from 'react';
import { IContacts } from 'src/interfaces';
import { CommonButton } from 'src/components/common';
import { getFullName } from 'src/utils/contact';
import { styleNames } from 'src/services';
import { InfoPartNoItems } from '..';

import style from './InfoPartRelatedContacts.scss';
import { AddRelatedContactModal } from '../..';

const sn = styleNames(style);

export const InfoPartRelatedContacts: FC<{
  contacts: IContacts;
  companyId: number;
  fetchCompanyWithRelatedContactsRequest: Function;
}> = ({ contacts, companyId, fetchCompanyWithRelatedContactsRequest }) => {
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
                  {getFullName({
                    firstName: first_name,
                    lastName: last_name,
                    fullName: full_name
                  })}
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
          fetchCompanyWithRelatedContactsRequest={
            fetchCompanyWithRelatedContactsRequest
          }
        />
      )}
    </>
  );
};
