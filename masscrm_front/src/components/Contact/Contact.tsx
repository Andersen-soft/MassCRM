import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { Header } from 'src/components/common';
import { useSelector } from 'react-redux';
import { getUserRoles } from 'src/selectors';
import {
  DailyPlan,
  ContactFormSlider,
  ContactTable,
  AddContactSearch,
  TableSearch,
  TablePanel
} from './components';
import style from './Contact.scss';

const sn = styleNames(style);

export const Contact: FC<{
  addContactsPage?: boolean;
  myContactPage?: boolean;
}> = ({ addContactsPage, myContactPage }) => {
  const userRole = useSelector(getUserRoles);
  const isFullTable = !!userRole?.manager || !!userRole?.superAdmin;

  return (
    <>
      <Header />
      <div className='container'>
        <div className={sn('add-contact')}>
          {Boolean(addContactsPage) && <DailyPlan />}
          {addContactsPage ? (
            <ContactFormSlider />
          ) : (
            <TableSearch isFullTable={isFullTable} />
          )}
          <div className={sn('data')}>
            {addContactsPage ? <AddContactSearch /> : <TablePanel />}
            <ContactTable
              daily={addContactsPage}
              myContact={myContactPage}
              isFullTable={isFullTable}
            />
          </div>
        </div>
      </div>
    </>
  );
};
