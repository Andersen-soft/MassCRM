import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Edit } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ICompany, IPreviousCompany } from 'src/interfaces';
import { CommonIcon } from 'src/view/atoms';
import {
  getPreviousCompanies,
  getPreviousCompaniesSelector
} from 'src/store/slices';
import { infoPartStyles } from 'src/styles';

interface IProps {
  id: number;
  company: ICompany;
  position?: string;
  handleChange: (focus?: string) => void;
  canEdit?: boolean;
}

export const Career: FC<IProps> = ({
  id,
  company,
  position: currentPosition,
  handleChange,
  canEdit
}) => {
  const dispatch = useDispatch();

  const previousCompanies = useSelector(getPreviousCompaniesSelector);

  const infoPartClasses = infoPartStyles();

  const columnItem = useCallback(
    (title: string, value?: string, editFieldName?: string) => (
      <div className={infoPartClasses.columnItem}>
        <span className={infoPartClasses.spanLeft}>{title}:</span>
        <span className={infoPartClasses.spanRight}>
          <div className={infoPartClasses.columnValue}>{value}</div>
          {editFieldName && value && canEdit && (
            <CommonIcon
              IconComponent={Edit}
              onClick={() => handleChange(editFieldName)}
            />
          )}
        </span>
      </div>
    ),
    [handleChange]
  );

  const currentCompany = useMemo(
    () => (
      <div className={infoPartClasses.section}>
        <div
          className={`${infoPartClasses.title} ${infoPartClasses.titleCurrent}`}
        >
          Current company
        </div>
        <div className={infoPartClasses.wrapperMin}>
          <div className={infoPartClasses.column}>
            {columnItem('Date of change', company?.updated_at)}
            {columnItem('Company', company?.name, 'company')}
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
        <div className={infoPartClasses.section}>
          <div className={infoPartClasses.title}>Previous company</div>
          <div className={infoPartClasses.wrapperMin}>
            {previousCompanies.map(
              ({
                company_name,
                company_id,
                position,
                updated_at
              }: IPreviousCompany) => (
                <div
                  className={infoPartClasses.previousColumn}
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
    <div className={infoPartClasses.wrapper}>
      {currentCompany}
      {previousCompanyList}
    </div>
  );
};
