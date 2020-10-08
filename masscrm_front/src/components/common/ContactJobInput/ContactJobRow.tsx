import React, { FC } from 'react';
import { Close, Edit } from '@material-ui/icons';
import { IContactJobRow } from 'src/interfaces/IContactJobInput';
import { CommonIcon } from '../CommonIcon';
import { jobInputStyle } from './ContactJobInput.style';

export const ContactJobRow: FC<IContactJobRow> = ({
  jobs,
  indexCorrection,
  onEditHandler,
  onRemoveHandler
}) => {
  const style = jobInputStyle();

  const removeHandler = (index: number) => () => {
    onRemoveHandler(index);
  };
  const editHandler = (index: number) => (event: React.MouseEvent) => {
    onEditHandler(index, event.currentTarget);
  };

  return (
    <ul className={style.jobList}>
      {jobs.map((jobItem, index) => (
        <li className={style.jobListEl} key={jobItem.link}>
          <span>
            <a
              href={jobItem.link}
              className={style.jobListLink}
              target='_blank'
              rel='noreferrer'
            >
              {jobItem.job}
            </a>
          </span>
          <span> - {jobItem.skills}</span>
          <span>
            <CommonIcon
              IconComponent={Close}
              className={style.jobListIcon}
              onClick={removeHandler(index)}
            />
          </span>
          <span>
            <CommonIcon
              IconComponent={Edit}
              className={style.jobListIcon}
              onClick={editHandler(index + indexCorrection)}
            />
          </span>
        </li>
      ))}
    </ul>
  );
};
