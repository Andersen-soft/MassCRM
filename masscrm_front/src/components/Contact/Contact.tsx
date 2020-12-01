import React, { FC, useEffect, useMemo } from 'react';
import { styleNames } from 'src/services';
import { Header } from 'src/components/common';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsLength, getShowContact, getUserRoles } from 'src/selectors';
import { getCountryList, getFiltersData, getIndustriesList } from 'src/actions';
import {
  DailyPlan,
  ContactTable,
  AddContactSearch,
  TableSearch,
  TablePanel,
  ContactForm
} from './components';
import style from './Contact.scss';

const sn = styleNames(style);

export const Contact: FC<{
  addContactsPage?: boolean;
  myContactPage?: boolean;
}> = ({ addContactsPage, myContactPage }) => {
  const dispatch = useDispatch();
  const userRole = useSelector(getUserRoles);
  const dataLength = useSelector(getContactsLength);
  const showContact = useSelector(getShowContact);
  const isFullTable = !!userRole?.manager || !!userRole?.superAdmin;
  const rowsForJob = Boolean(userRole?.nc1);
  const title = useMemo(
    () => (userRole?.nc1 || userRole?.nc2 ? 'My contacts' : 'All contacts'),
    [userRole]
  );

  const panel = useMemo(
    () =>
      addContactsPage ? (
        <AddContactSearch />
      ) : (
        <TablePanel
          title={title}
          total={dataLength}
          show={showContact}
          Search={TableSearch}
        />
      ),
    [addContactsPage, title, dataLength, showContact]
  );

  const tools = useMemo(
    () =>
      addContactsPage && (
        <>
          <DailyPlan />
          <ContactForm />
        </>
      ),
    [addContactsPage, isFullTable]
  );

  useEffect(() => {
    dispatch(getIndustriesList());
    dispatch(getCountryList());
    dispatch(getFiltersData());
  }, []);

  return (
    <>
      <Header />
      <div className='container'>
        <div className={sn('add-contact')}>
          {tools}
          <div className={sn('data')}>
            {panel}
            <ContactTable
              daily={addContactsPage}
              isFullTable={isFullTable}
              rowsForJob={rowsForJob}
              myContact={myContactPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
