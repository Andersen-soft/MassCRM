import React, { FC, useMemo, useCallback } from 'react';
import { styleNames } from 'src/services';
import { ICompany, IIndustry } from 'src/interfaces';
import {
  ShowMoreInformation,
  LinkedinField,
  LinkField
} from 'src/components/common';
import { getCompanySize } from 'src/utils/companySize';
import style from './InfoPartCompanyInfo.scss';
import { InfoItem } from '.';

const sn = styleNames(style);

export const InfoPartCompanyInfo: FC<{ companyData: ICompany }> = ({
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
  const renderItem = useCallback(
    (
      value?: string | (() => JSX.Element) | false | JSX.Element,
      label?: string
    ) => (
      <div className={sn('wrapper')}>
        <span className={sn('spanLeft')}>{label && `${label}:`}</span>
        <span className={sn('spanRight')}>{value}</span>
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
    (list: Array<{ id?: number; value?: string }>) =>
      renderItem(
        (() => (
          <ShowMoreInformation>
            {(list || []).slice(1).map(({ id, value }) => (
              <div className={sn('list')} key={id || value}>
                {value}
              </div>
            ))}
          </ShowMoreInformation>
        ))()
      ),
    []
  );

  const showMoreItems = useCallback(
    (elems: Array<IIndustry>) =>
      elems?.length > 1 &&
      showMoreBtn(
        elems.map(({ id, name: elemName }: IIndustry) => ({
          id,
          value: elemName
        }))
      ),
    [holding, subsidiary, industries]
  );

  const getFirstItem = (itemArr: Array<{ name: string }>) =>
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
    <div className={sn('wrapper')}>
      <div className={sn('column')}>{mainInformation}</div>
      <div className={`${sn('column')} ${sn('column_small')}`}>
        {renderItem(comment, 'Comment')}
      </div>
    </div>
  );
};
