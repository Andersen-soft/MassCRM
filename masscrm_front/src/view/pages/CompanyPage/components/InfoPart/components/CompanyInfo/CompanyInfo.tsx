import React, { FC, useMemo, useCallback } from 'react';
import { ICompany, IIndustry } from 'src/interfaces';
import { getCompanySize } from 'src/utils';
import { ShowMoreInformation } from 'src/view/organisms';
import { LinkedinField } from 'src/view/molecules';
import { LinkField, InfoItem } from './components';
import { useStyles } from './CompanyInfo.styles';

interface IProps {
  companyData: ICompany;
}

export const CompanyInfo: FC<IProps> = ({
  companyData: {
    name,
    website,
    sto_full_name,
    linkedin,
    type,
    founded,
    max_employees,
    min_employees,
    comment,
    industries,
    subsidiary,
    holding
  }
}) => {
  const styles = useStyles();

  const renderItem = useCallback(
    (
      value?: string | (() => JSX.Element) | false | JSX.Element,
      label?: string
    ) => (
      <div className={styles.wrapper}>
        <span className={styles.spanLeft}>{label && `${label}:`}</span>
        <span className={styles.spanRight}>{value}</span>
      </div>
    ),
    [
      name,
      website,
      linkedin,
      type,
      founded,
      max_employees,
      min_employees,
      comment,
      industries,
      subsidiary,
      holding
    ]
  );

  const showMoreBtn = useCallback(
    (list: { id?: number; value?: string }[]) =>
      renderItem(
        (() => (
          <ShowMoreInformation>
            {(list || []).slice(1).map(({ id, value }) => (
              <div className={styles.list} key={id || value}>
                {value}
              </div>
            ))}
          </ShowMoreInformation>
        ))()
      ),
    []
  );

  const showMoreItems = useCallback(
    (elems: IIndustry[]) =>
      elems?.length > 1 &&
      showMoreBtn(
        elems.map(({ id, name: elemName }: IIndustry) => ({
          id,
          value: elemName
        }))
      ),
    [holding, subsidiary, industries]
  );

  const getFirstItem = (itemArr: { name: string }[]) =>
    !!itemArr.length && itemArr[0]?.name;

  const companyDataMap = [
    {
      title: 'Company',
      value: name
    },
    {
      title: 'Website',
      value: <LinkField link={website} />
    },
    {
      title: 'CTO',
      value: sto_full_name
    },
    {
      title: 'Company Linkedin',
      value: <LinkedinField link={linkedin} linkType='linkedin' />
    },
    {
      title: 'Industry',
      value: industries && getFirstItem(industries),
      showMore: industries && showMoreItems(industries)
    },
    {
      title: 'Company size',
      value: getCompanySize(max_employees, min_employees)
    },
    {
      title: 'Type of company',
      value: type
    },
    {
      title: 'Subsidiary companies',
      value: subsidiary && getFirstItem(subsidiary),
      showMore: subsidiary && showMoreItems(subsidiary)
    },
    {
      title: 'Holding company',
      value: holding && getFirstItem(holding),
      showMore: holding && showMoreItems(holding)
    },
    {
      title: 'Founded',
      value: founded
    }
  ];

  const mainInformation = useMemo(
    () =>
      companyDataMap.map(companyDataMapItem => (
        <InfoItem
          key={companyDataMapItem.title}
          renderItem={renderItem}
          {...companyDataMapItem}
        />
      )),
    [companyDataMap]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>{mainInformation}</div>
      <div className={`${styles.column} ${styles.columnSmall}`}>
        {renderItem(comment, 'Comment')}
      </div>
    </div>
  );
};
