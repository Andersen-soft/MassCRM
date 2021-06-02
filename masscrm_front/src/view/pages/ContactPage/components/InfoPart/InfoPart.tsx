import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOneContactRequest,
  getPreviousCompanies,
  getContactSelector,
  getUserRoles
} from 'src/store/slices';
import { CommonButton } from 'src/view/atoms';
import { Tabs } from 'src/view/molecules';
import { ContactEdit } from 'src/view/organisms';
import { infoPartStyles } from 'src/styles';
import { useTabsState } from 'src/hooks';
import { getTabsStateParams } from 'src/constants';
import {
  Sale,
  Mails,
  Campaigns,
  Career,
  ContactInfo,
  DeleteContact
} from './components';
import { tabButtonsConfig } from './configs';

interface IProps {
  id: number;
}

export const InfoPart: FC<IProps> = ({ id }) => {
  const dispatch = useDispatch();

  const contactData = useSelector(getContactSelector);
  const { nc1, nc2 } = useSelector(getUserRoles);
  const canEdit = !(nc1 || nc2);

  const [open, setOpen] = useState(false);
  const [autoFocus, setAutoFocus] = useState<string>();

  const tabsState = useTabsState(getTabsStateParams(tabButtonsConfig));

  const { company, position, sales = [] } = contactData;

  const styles = infoPartStyles();

  const handleToggleEditForm = useCallback(
    (focus?: string) => {
      setOpen(val => !val);
      setAutoFocus(focus);
    },
    [setOpen]
  );

  const handleChangeTab = useCallback(
    (selectedTab: string | number) => {
      tabsState.onChangeTab(selectedTab);
    },
    [tabsState]
  );

  const onSubmitSuccess = useCallback(() => {
    id && dispatch(getOneContactRequest(id));
    dispatch(getPreviousCompanies(id));
  }, [id]);

  useEffect(() => {
    id && dispatch(getOneContactRequest(id));
  }, []);

  return (
    <>
      {contactData.id && (
        <div className={styles.infoBody}>
          <Tabs
            defaultSelected={tabsState.selectedTab}
            tabsConfig={tabButtonsConfig}
            onChange={handleChangeTab}
            contentClassName={styles.infoContent}
            className={styles.tabs}
          >
            <ContactInfo contactData={contactData} />
            <Career
              id={id}
              company={company}
              position={position}
              handleChange={handleToggleEditForm}
              canEdit={canEdit}
            />
            <Sale sales={sales} />
            <Campaigns contactData={contactData} />
            <Mails contactData={contactData} />
          </Tabs>
          <div className={styles.infoTabsTools}>
            {canEdit && (
              <CommonButton
                text='Edit page'
                onClickHandler={handleToggleEditForm}
              />
            )}
            <DeleteContact id={id} />
          </div>
        </div>
      )}
      {open && (
        <ContactEdit
          contact={contactData}
          handleClose={handleToggleEditForm}
          open={open && 'edit'}
          autoFocus={autoFocus}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </>
  );
};

export default InfoPart;
