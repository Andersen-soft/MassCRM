import React, { FC, useCallback } from 'react';
import { CommonButton } from 'src/components/common';
import { ICompany, IContactJobValues } from 'src/interfaces';
import { styleNames } from 'src/services';
import { InfoPartJob, InfoPartNoItems } from '..';

import style from './InfoPartJobs.scss';

const sn = styleNames(style);

export const InfoPartJobs: FC<{
  vacancies?: IContactJobValues[];
  getDeleteJob: (jobId: number) => void;
  companyData: ICompany;
  handleToggleEditForm: Function;
}> = ({ vacancies, getDeleteJob, handleToggleEditForm }) => {
  const handleGetDeleteJob = useCallback(
    (id: number) => () => {
      getDeleteJob(id);
    },
    []
  );

  const onToggleEditForm = useCallback(() => handleToggleEditForm(), [
    handleToggleEditForm
  ]);

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
                handleToggleEditForm={handleToggleEditForm}
              />
            ))}
          </div>
        ) : (
          <InfoPartNoItems items='available jobs' />
        )}
      </div>
      <CommonButton
        text='Add new job'
        onClickHandler={onToggleEditForm}
        align='alignRight'
      />
    </>
  );
};
