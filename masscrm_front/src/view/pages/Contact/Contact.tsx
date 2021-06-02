import React, { FC, useEffect, useMemo, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, ContactForm, TablePanel } from 'src/view/organisms';
import {
  getContactsLength,
  getShowContact,
  getUserRoles,
  getCountryList,
  getFiltersData,
  fetchIndustriesList,
  setShowCountContacts,
  setPage
} from 'src/store/slices';
import { ALL_CONTACTS, MY_CONTACTS } from 'src/constants';
import { SHOW_COUNTS_CONTACTS_TABLE } from './constants';
import { Title, DailyPlan, Search, Table } from './components';
import { useStyles } from './Contact.styles';

interface IProps {
  addContactsPage?: boolean;
  myContactPage?: boolean;
}

export const Contact: FC<IProps> = ({ addContactsPage, myContactPage }) => {
  const dispatch = useDispatch();

  const userRole = useSelector(getUserRoles);
  const dataLength = useSelector(getContactsLength);
  const showContact = useSelector(getShowContact);

  const isFullTable = !!userRole?.manager || !!userRole?.superAdmin;

  const title = useMemo(
    () => (userRole?.nc1 || userRole?.nc2 ? MY_CONTACTS : ALL_CONTACTS),
    [userRole]
  );

  const styles = useStyles();

  const handleChangeShowCount = ({
    target: { value }
  }: ChangeEvent<{ value: unknown }>) => {
    dispatch(setPage(1));
    dispatch(setShowCountContacts(value as number));
  };

  const panel = useMemo(
    () =>
      addContactsPage ? (
        <Title />
      ) : (
        <TablePanel
          title={title}
          total={dataLength}
          show={showContact}
          Search={Search}
          countConfig={SHOW_COUNTS_CONTACTS_TABLE}
          handleChangeShowCount={handleChangeShowCount}
        />
      ),
    [addContactsPage, title, dataLength, showContact]
  );

  const tools = useMemo(
    () =>
      addContactsPage && (
        <>
          <DailyPlan />
          <ContactForm
            shouldGetFiltersData={!(addContactsPage || myContactPage)}
          />
        </>
      ),
    [addContactsPage, isFullTable]
  );

  useEffect(() => {
    dispatch(fetchIndustriesList());
    dispatch(getCountryList());
    dispatch(getFiltersData());
  }, []);

  return (
    <>
      <Header daily={addContactsPage} myContacts={myContactPage} />
      <div className='container'>
        <div className={styles.addContact}>
          {tools}
          <div className={styles.data}>
            {panel}
            <Table
              daily={addContactsPage}
              isFullTable={isFullTable}
              rowsForJob={!!userRole?.nc2}
              myContacts={myContactPage}
              totalCount={dataLength}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
