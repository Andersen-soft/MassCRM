import React, { FC, useCallback, useState } from 'react';
import { CommonButton, AddOrEditJobModal } from 'src/components/common';
import { IContactsJobs, IContactJobValues } from 'src/interfaces';
import { styleNames } from 'src/services';
import { InfoPartJob, InfoPartNoItems } from '..';

import style from './InfoPartJobs.scss';

const sn = styleNames(style);

export const InfoPartJobs: FC<{
  vacancies?: IContactsJobs;
  getDeleteJob: (jobId: number) => void;
  getVacancyToEdit: (jobId: number) => void;
  companyId: number;
  vacancyToEdit: IContactJobValues;
}> = ({
  vacancies,
  getDeleteJob,
  getVacancyToEdit,
  companyId,
  vacancyToEdit
}) => {
  const [openAddOrEditForm, setOpenAddOrEditForm] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleGetDeleteJob = useCallback(
    (id: number) => () => {
      getDeleteJob(id);
    },
    [vacancies]
  );

  const handleGetVacancyToEdit = useCallback(
    (id: number) => () => {
      getVacancyToEdit(id);
    },
    [vacancies]
  );

  const handleModalType = useCallback(
    (val: string) => {
      setModalType(val);
    },
    [modalType]
  );

  const onToggleAddOrEditForm = useCallback(
    (val?: string) => () => {
      if (val && val !== 'edit') {
        handleModalType(openAddOrEditForm ? '' : 'add');
      } else {
        handleModalType(openAddOrEditForm ? '' : 'edit');
      }

      openAddOrEditForm && handleGetVacancyToEdit(0)();
      setOpenAddOrEditForm(prev => !prev);
    },
    [openAddOrEditForm]
  );

  return (
    <>
      <div className={sn('wrapper')}>
        {vacancies?.length ? (
          <div className={sn('wrapper-jobs')}>
            {vacancies.map(vacancy => (
              <InfoPartJob
                key={vacancy.id}
                vacancy={vacancy}
                getDeleteJob={handleGetDeleteJob(vacancy.id as number)}
                getVacancyToEdit={handleGetVacancyToEdit(vacancy.id as number)}
                handleToggleEditForm={onToggleAddOrEditForm}
                open={openAddOrEditForm}
              />
            ))}
          </div>
        ) : (
          <InfoPartNoItems items='available jobs' />
        )}
      </div>
      <CommonButton
        text='Add new job'
        onClickHandler={onToggleAddOrEditForm('add')}
        align='alignRight'
      />
      {openAddOrEditForm && (
        <AddOrEditJobModal
          vacancies={vacancies}
          handleClose={onToggleAddOrEditForm}
          open={openAddOrEditForm}
          modalType={modalType}
          companyId={companyId}
          vacancyToEdit={vacancyToEdit}
        />
      )}
    </>
  );
};
