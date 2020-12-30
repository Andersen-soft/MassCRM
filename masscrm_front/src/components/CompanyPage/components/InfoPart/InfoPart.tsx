import React, { FC, useCallback, useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IContactJobValues } from 'src/interfaces';
import { styleNames } from 'src/services';
import { getCompany, getContacts } from 'src/selectors';
import {
  updateCompany,
  getOneCompanyRequest,
  getContact,
  getRelatedContacts,
  getIndustriesList,
  getFiltersData
} from 'src/actions';
import {
  CommonButton,
  CompanyDelete,
  CompanyEdit,
  CompanyRelatedContactsModal
} from 'src/components/common';
import { InfoPartCompanyInfo, InfoPartJobs, InfoPartRelatedContacts } from '.';

import style from './InfoPart.scss';

const sn = styleNames(style);

const buttonData = [
  { type: 'companyInfo', label: 'Company Info' },
  { type: 'jobs', label: 'Jobs' },
  { type: 'relatedContacts', label: 'Related contacts' }
];

export const InfoPart: FC<{ id: number }> = ({ id }) => {
  const companyData = useSelector(getCompany);
  const contactsData = useSelector(getContacts);
  const dispatch = useDispatch();

  const [isActiveTab, setToActiveTab] = useState<string>('companyInfo');
  const [updatedJobs, setUpdatedJobs] = useState<Array<IContactJobValues>>([]);
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);

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
    id && dispatch(getOneCompanyRequest(id));
  }, [id]);

  const getDeleteJob = (jobId: number) => {
    const updatedVacancies =
      companyData.vacancies?.filter(vacancy => vacancy.id !== jobId) || [];

    setUpdatedJobs(updatedVacancies);
    updateCompany(companyData.id, { vacancies: [...updatedVacancies] });
  };

  const fetchRelatedContacts = async () => {
    const relatedContacts = await getContact({
      search: { company: { name: [companyData.name] } }
    });
    dispatch(getRelatedContacts({ data: [...relatedContacts] }));
  };

  const infoPartBody = useCallback(
    (tabName: string) => {
      const COMPONENTS: { [index: string]: JSX.Element } = {
        companyInfo: <InfoPartCompanyInfo companyData={companyData} />,
        jobs: (
          <InfoPartJobs
            vacancies={companyData.vacancies}
            getDeleteJob={getDeleteJob}
            companyData={companyData}
            handleToggleEditForm={handleToggleForm(setOpenEditForm)}
          />
        ),
        relatedContacts: (
          <InfoPartRelatedContacts
            contacts={contactsData}
            companyId={companyData.id}
            fetchRelatedContacts={fetchRelatedContacts}
          />
        )
      };
      return COMPONENTS[tabName] || null;
    },
    [companyData, contactsData]
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
    id && dispatch(getOneCompanyRequest(id));
  }, [updatedJobs, id]);

  useEffect(() => {
    dispatch(getIndustriesList());
    dispatch(getFiltersData());
  }, []);

  useEffect(() => {
    companyData.name && fetchRelatedContacts();
  }, [companyData]);

  return (
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
          relatedContacts={contactsData}
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
  );
};
