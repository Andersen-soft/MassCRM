import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Edit } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import { ICompany, IPreviousCompany } from 'src/interfaces';
import { CommonIcon } from 'src/components/common/CommonIcon';
import { getPreviousCompanies } from 'src/actions';
import { getPreviousCompaniesSelector } from 'src/selectors';
import style from '../InfoPart.scss';

const sn = styleNames(style);

export const InfoPartCareer: FC<{
  id: number;
  company: ICompany;
  position?: string;
  handleChange: (focus?: string) => void;
}> = ({ id, company, position: currentPosition, handleChange }) => {
  const dispatch = useDispatch();
  const previousCompanies = useSelector(getPreviousCompaniesSelector);

  const columnItem = useCallback(
    (title, value, isEdit?) => (
      <div className={sn('column_item')}>
        <span className={sn('spanLeft')}>{title}:</span>
        <span className={sn('spanRight')}>
          <div className={sn('column_value')}>{value}</div>
          {isEdit && (
            <CommonIcon
              IconComponent={Edit}
              onClick={() => handleChange(isEdit)}
            />
          )}
        </span>
      </div>
    ),
    [handleChange]
  );

  const currentCompany = useMemo(
    () => (
      <div className={sn('section')}>
        <div className={`${sn('title')} ${sn('title_current')}`}>
          Current company
        </div>
        <div className={sn('wrapper')}>
          <div className={sn('column')}>
            {columnItem('Date of change', company.updated_at)}
            {columnItem('Company', company.name, 'company')}
            {columnItem('Position', currentPosition, 'position')}
          </div>
        </div>
      </div>
    ),
    [company, currentPosition]
  );

  useEffect(() => {
    dispatch(getPreviousCompanies(id));
  }, [id]);

  const previousCompanyList = useMemo(
    () =>
      previousCompanies && (
        <div className={sn('section')}>
          <div className={sn('title')}>Previous company</div>
          <div className={sn('wrapper')}>
            {previousCompanies.map(
              ({
                company_name,
                company_id,
                position,
                updated_at
              }: IPreviousCompany) => (
                <div
                  className={sn('previous-column')}
                  key={`${company_id} ${position} ${updated_at}`}
                >
                  {columnItem('Date of change', updated_at)}
                  {columnItem('Company', company_name)}
                  {columnItem('Position', position)}
                </div>
              )
            )}
          </div>
        </div>
      ),
    [previousCompanies]
  );

  return (
    <>
      {currentCompany}
      {previousCompanyList}
    </>
  );
};
