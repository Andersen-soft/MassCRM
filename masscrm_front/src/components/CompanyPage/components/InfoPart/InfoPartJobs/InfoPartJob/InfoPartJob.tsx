import React, { FC, useMemo, useCallback } from 'react';
import { styleNames } from 'src/services';
import { Tooltip } from '@material-ui/core';
import { CommonIcon } from 'src/components/common';
import { tooltipStyle } from 'src/styles/ToolTip.style';
import { IContactJobValues } from 'src/interfaces';
import { Edit, Delete } from '@material-ui/icons';
import { cutStringWithEllipsis } from 'src/utils/string';
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
  const styleTooltip = tooltipStyle();

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
          <Tooltip
            title={vacancy.job}
            placement='top-start'
            classes={styleTooltip}
          >
            <div className={sn('editBlock_title')}>
              {cutStringWithEllipsis(vacancy.job, 35)}
            </div>
          </Tooltip>
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
