import React, { FC, useCallback, useState } from 'react';
import { Contacts } from 'src/interfaces';
import { CommonButton, NoItemsMessage } from 'src/view/atoms';
import { getFullName } from 'src/utils';
import { BLANK, NO_REFERRER } from 'src/constants';
import { AddRelatedContactModal } from './components';
import { useStyles } from './RelatedContacts.styles';

interface IProps {
  contacts: Contacts;
  companyId: number;
  fetchCompanyWithRelatedContactsRequest: Function;
}

export const RelatedContacts: FC<IProps> = ({
  contacts,
  companyId,
  fetchCompanyWithRelatedContactsRequest
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleAddRelatedContactForm = useCallback(
    () => setOpen((val: boolean) => !val),
    [setOpen]
  );

  const styles = useStyles();

  return (
    <>
      <div className={styles.wrapper}>
        {contacts.length ? (
          <div className={styles.wrapperContacts}>
            <div className={styles.title}>Related contacts:</div>
            <div
              className={`${styles.contactBlock} ${contacts.length > 5 &&
                styles.spaceBetween}`}
            >
              {contacts.map(({ id, first_name, last_name, full_name }) => (
                <a
                  className={styles.contact}
                  key={id}
                  href={`/contact?id=${id}`}
                  target={BLANK}
                  rel={NO_REFERRER}
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
          <NoItemsMessage items='related contacts' />
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
