import React, { FC, useMemo, useCallback } from 'react';
import { styleNames } from 'src/services';
import { CommonIcon } from 'src/components/common';
import { IContactJobValues } from 'src/interfaces';
import { Edit, Delete } from '@material-ui/icons';
import { InfoPartItem } from '../..';

import style from './InfoPartJob.scss';

const sn = styleNames(style);

const jobDataMap: { [key: string]: string } = {
  job: 'Job',
  skills: 'Job skills',
  link: 'Job URL'
};

export const InfoPartJob: FC<{
  vacancy: IContactJobValues;
  getDeleteJob: () => void;
  getVacancyToEdit: () => void;
  handleToggleEditForm: Function;
  open: boolean;
}> = ({
  vacancy,
  getDeleteJob,
  handleToggleEditForm,
  open,
  getVacancyToEdit
}) => {
  const info = useMemo(
    () =>
      Object.keys(jobDataMap).map(item => (
        <InfoPartItem
          title={jobDataMap[item]}
          key={item}
          value={vacancy[item] as string}
          isLink={item === 'link'}
        />
      )),
    [vacancy]
  );

  const onToggleEditForm = useCallback(() => {
    handleToggleEditForm(open ? '' : 'edit')();
    !open && getVacancyToEdit();
  }, [vacancy]);

  return (
    <>
      <div className={sn('wrapper')}>
        <div className={sn('editBlock')}>
          <div className={sn('editBlock_title')}>{vacancy.job}</div>
          <div className={sn('editBlock_icons')}>
            <CommonIcon
              IconComponent={Edit}
              className={sn('editBlock_icon')}
              onClick={onToggleEditForm}
            />
            <CommonIcon IconComponent={Delete} onClick={getDeleteJob} />
          </div>
        </div>
        {info}
      </div>
    </>
  );
};
