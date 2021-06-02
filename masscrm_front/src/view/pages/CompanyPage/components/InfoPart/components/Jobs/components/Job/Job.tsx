import React, { FC, useMemo, useCallback } from 'react';
import { Edit, Delete } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { CommonIcon } from 'src/view/atoms';
import { tooltipStyles } from 'src/styles';
import { IContactJobValues } from 'src/interfaces';
import { cutStringWithEllipsis } from 'src/utils';
import { TOP_START } from 'src/constants';
import { dataMap } from './constants';
import { InfoPartJobItem } from './components';
import { useStyles } from './Job.styles';

interface IProps {
  vacancy: IContactJobValues;
  getDeleteJob: () => void;
  getVacancyToEdit: () => void;
  handleToggleEditForm: Function;
  open: boolean;
}

export const Job: FC<IProps> = ({
  vacancy,
  getDeleteJob,
  handleToggleEditForm,
  open,
  getVacancyToEdit
}) => {
  const tooltipClasses = tooltipStyles();

  const vacancyLocation = [
    vacancy?.job_country,
    vacancy?.job_region,
    vacancy?.job_city
  ]
    .filter(item => item)
    .join(', ');

  const styles = useStyles();

  const info = useMemo(
    () =>
      Object.keys(dataMap).map(item => (
        <InfoPartJobItem
          title={dataMap[item]}
          key={item}
          value={
            item === 'location' ? vacancyLocation : (vacancy[item] as string)
          }
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
      <div className={styles.wrapper}>
        <div className={styles.editBlock}>
          <Tooltip
            title={vacancy.job}
            placement={TOP_START}
            classes={tooltipClasses}
          >
            <div className={styles.editBlockTitle}>
              {cutStringWithEllipsis(vacancy.job, 35)}
            </div>
          </Tooltip>
          <div className={styles.editBlockIcons}>
            <CommonIcon
              IconComponent={Edit}
              className={styles.editBlockIcons}
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
