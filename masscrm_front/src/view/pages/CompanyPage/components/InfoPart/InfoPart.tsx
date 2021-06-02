import React, { FC, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCompany,
  getCompanyRelatedContacts,
  getLoader,
  getUserRoles,
  updateCompany,
  getCompanyWithRelatedContactsRequest
} from 'src/store/slices';
import { CommonButton, Loader } from 'src/view/atoms';
import { Tabs } from 'src/view/molecules';
import { IContactJobValues } from 'src/interfaces';
import { useTabsState } from 'src/hooks';
import { getTabsStateParams } from 'src/constants';
import { infoPartStyles } from 'src/styles';
import {
  Jobs,
  CompanyInfo,
  RelatedContacts,
  CompanyEdit,
  CompanyDelete,
  RelatedContactsModal
} from './components';
import { getTabButtonsConfig } from './config';

interface IProps {
  id: number;
}

export const InfoPart: FC<IProps> = ({ id }) => {
  const companyData = useSelector(getCompany);
  const load = useSelector(getLoader);
  const { nc1, nc2 } = useSelector(getUserRoles);
  const canEdit = !(nc1 || nc2);
  const relatedContactsData = useSelector(getCompanyRelatedContacts);

  const dispatch = useDispatch();

  const styles = infoPartStyles();

  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [vacancyToEdit, setVacancyToEdit] = useState({} as IContactJobValues);

  const tabsState = useTabsState(getTabsStateParams(getTabButtonsConfig(!nc1)));

  const handleSetOpenMessage = useCallback(() => {
    setOpenMessage((prevState: boolean) => !prevState);
  }, [openMessage]);

  const handleToggleForm = useCallback(
    (toggleEditFunc: Function) => () => {
      toggleEditFunc((val: boolean) => !val);
    },
    [openEditForm, openDeleteForm]
  );

  const onSubmitSuccess = useCallback(() => {
    id && dispatch(getCompanyWithRelatedContactsRequest(id));
  }, [id]);

  const getDeleteJob = (jobId: number) => {
    const updatedVacancies =
      companyData.vacancies?.filter(vacancy => vacancy.id !== jobId) || [];

    updateCompany(companyData.id, {
      vacancies: [...updatedVacancies]
    }).then(() => dispatch(getCompanyWithRelatedContactsRequest(id)));
  };

  const getVacancyToEdit = (jobId: number) => {
    const jobToEdit =
      companyData.vacancies?.find(
        ({ id: vacancyId }: IContactJobValues) => vacancyId === jobId
      ) || ({} as IContactJobValues);
    setVacancyToEdit(jobToEdit);
  };

  const fetchCompanyWithRelatedContactsRequest = () =>
    dispatch(getCompanyWithRelatedContactsRequest(id));

  const handleChangeTab = useCallback(
    (selectedTab: string | number) => {
      tabsState.onChangeTab(selectedTab);
    },
    [tabsState]
  );

  useEffect(() => {
    id && fetchCompanyWithRelatedContactsRequest();
  }, [id]);

  return (
    <>
      {companyData.id && (
        <div className={styles.infoBody}>
          <Tabs
            tabsConfig={getTabButtonsConfig(!nc1)}
            defaultSelected={tabsState.selectedTab}
            onChange={handleChangeTab}
            contentClassName={styles.infoContent}
            className={styles.tabs}
          >
            <CompanyInfo companyData={companyData} />
            <Jobs
              vacancies={companyData.vacancies}
              getDeleteJob={getDeleteJob}
              getVacancyToEdit={getVacancyToEdit}
              companyId={companyData.id}
              vacancyToEdit={vacancyToEdit}
            />
            <RelatedContacts
              contacts={relatedContactsData}
              companyId={companyData.id}
              fetchCompanyWithRelatedContactsRequest={
                fetchCompanyWithRelatedContactsRequest
              }
            />
          </Tabs>
          <div className={styles.infoTabsTools}>
            {canEdit ? (
              <CommonButton
                text='Edit page'
                onClickHandler={handleToggleForm(setOpenEditForm)}
              />
            ) : null}
            <CommonButton
              text='Delete page'
              onClickHandler={handleToggleForm(setOpenDeleteForm)}
            />
          </div>
        </div>
      )}
      {openEditForm && (
        <CompanyEdit
          company={companyData}
          handleClose={handleToggleForm(setOpenEditForm)}
          open={openEditForm}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
      {openDeleteForm && (
        <CompanyDelete
          handleClose={handleToggleForm(setOpenDeleteForm)}
          open={openDeleteForm}
          relatedContacts={relatedContactsData}
          handleSetOpenMessage={handleSetOpenMessage}
          id={companyData.id}
        />
      )}
      {openMessage && (
        <RelatedContactsModal
          open={openMessage}
          onClose={handleSetOpenMessage}
        />
      )}
      {load && <Loader />}
    </>
  );
};
