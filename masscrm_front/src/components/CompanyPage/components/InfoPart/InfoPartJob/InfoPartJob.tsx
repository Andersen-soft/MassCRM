import React, { FC, useMemo } from 'react';
import { styleNames } from 'src/services';
import { CommonIcon } from 'src/components/common';
import { Edit, Delete } from '@material-ui/icons';
import { InfoPartItem } from '..';

import style from './InfoPartJob.scss';

const sn = styleNames(style);

const jobDataMap: { [key: string]: string } = {
  job: 'Job',
  skills: 'Job skills',
  link: 'Job URL'
};

export const InfoPartJob: FC<{ companyJobData: any }> = ({
  companyJobData
}) => {
  const info = useMemo(
    () =>
      Object.keys(jobDataMap).map(item =>
        item !== 'link' ? (
          <InfoPartItem
            title={jobDataMap[item]}
            key={item}
            value={companyJobData[item]}
          />
        ) : (
          <InfoPartItem
            title={jobDataMap[item]}
            key={item}
            value={companyJobData[item]}
            isLink
          />
        )
      ),
    [companyJobData]
  );

  return (
    <div className={sn('wrapper')}>
      <div className={sn('editBlock')}>
        <div className={sn('editBlock_title')}>Vacancy</div>
        <div className={sn('editBlock_icons')}>
          {/* TODO: replace mock func-s by real ones for MAS-1121 and 1122 tasks  */}
          <CommonIcon
            IconComponent={Edit}
            className={sn('editBlock_icon')}
            onClick={() => {}}
          />
          <CommonIcon IconComponent={Delete} onClick={() => {}} />
        </div>
      </div>
      {info}
    </div>
  );
};
