import React, { FC, useCallback, useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styleNames } from 'src/services';
import {
  getCompany,
  getCompanyRelatedContacts,
  getLoader,
  getUserRoles
} from 'src/selectors';
import {
  updateCompany,
  getCompanyWithRelatedContactsRequest
} from 'src/actions';
import {
  CommonButton,
  CompanyDelete,
  CompanyEdit,
  CompanyRelatedContactsModal,
  Loader
} from 'src/components/common';
import { IContactJobValues } from 'src/interfaces';
import { InfoPartCompanyInfo, InfoPartJobs, InfoPartRelatedContacts } from '.';

import style from './InfoPart.scss';

const sn = styleNames(style);

export const InfoPart: FC<{ id: number }> = ({ id }) => {
  const companyData = useSelector(getCompany);
  const relatedContactsData = useSelector(getCompanyRelatedContacts);
  const dispatch = useDispatch();
  const load = useSelector(getLoader);

  const [isActiveTab, setToActiveTab] = useState('companyInfo');
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [vacancyToEdit, setVacancyToEdit] = useState({} as IContactJobValues);
  const roles = useSelector(getUserRoles);

  const buttonData = [
    { type: 'companyInfo', label: 'Company Info' },
    { type: 'jobs', label: !roles.nc1 ? 'Jobs' : '' },
    { type: 'relatedContacts', label: 'Related contacts' }
  ];

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

  const infoPartBody = useCallback(
    (tabName: string) => {
      const COMPONENTS: { [index: string]: JSX.Element } = {
        companyInfo: <InfoPartCompanyInfo companyData={companyData} />,
        jobs: (
          <InfoPartJobs
            vacancies={companyData.vacancies}
            getDeleteJob={getDeleteJob}
            getVacancyToEdit={getVacancyToEdit}
            companyId={companyData.id}
            vacancyToEdit={vacancyToEdit}
          />
        ),
        relatedContacts: (
          <InfoPartRelatedContacts
            contacts={relatedContactsData}
            companyId={companyData.id}
            fetchCompanyWithRelatedContactsRequest={
              fetchCompanyWithRelatedContactsRequest
            }
          />
        )
      };
      return COMPONENTS[tabName] || null;
    },
    [companyData, relatedContactsData, vacancyToEdit]
  );

  const clickHandler = useCallback(
    (type: string) => () => {
      setToActiveTab(type);
    },
    [setToActiveTab]
  );

  const tabs = useMemo(
    () =>
      buttonData.map(item => (
        <button
          key={item.type}
          type='button'
          className={sn(item.type === isActiveTab ? 'active' : '')}
          onClick={clickHandler(item.type)}
        >
          {item.label}
        </button>
      )),
    [buttonData, isActiveTab, clickHandler]
  );

  useEffect(() => {
    id && fetchCompanyWithRelatedContactsRequest();
  }, [id]);

  return (
    <>
      <div className={sn('info-body')}>
        <div className={sn('info-header')}>
          <div className={sn('info-tabs')}>{tabs}</div>
          <div className={sn('info-tools')}>
            <CommonButton
              text='Edit page'
              onClickHandler={handleToggleForm(setOpenEditForm)}
            />
            <CommonButton
              text='Delete page'
              onClickHandler={handleToggleForm(setOpenDeleteForm)}
            />
          </div>
        </div>
        <div className={sn('info-content')}>
          {companyData.id && infoPartBody(isActiveTab)}
        </div>
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
          <CompanyRelatedContactsModal
            open={openMessage}
            onClose={handleSetOpenMessage}
          />
        )}
      </div>
      {load && <Loader />}
    </>
  );
};
