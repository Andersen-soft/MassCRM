import React, { useState } from 'react';
import { Publish } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import { CommonIcon } from 'src/components/common';
import { getContactsLength, getFilterSettings } from 'src/selectors';
import { IContactFilter, IContactSearchDownload } from 'src/interfaces';
import { downLoadReport } from 'src/actions';
import style from '../../TableSearch.scss';

const sn = styleNames(style);

export const DownloadReport = () => {
  const filterSettings = useSelector(getFilterSettings);
  const [disabled, setDisabled] = useState<boolean>(false);
  const total = useSelector(getContactsLength);

  const onDownload = ({ search, sort }: IContactFilter) => async () => {
    const {
      created_at,
      updated_at,
      first_name,
      last_name,
      birthday,
      full_name,
      added_to_mailing,
      colleague_link,
      colleague_name,
      comment,
      company,
      email,
      last_touch,
      linkedin,
      mailing_tool,
      my_notes,
      phone,
      requires_validation,
      sale,
      service_id,
      social_networks,
      ...searchParams
    } = search || {};

    const newSearch: IContactSearchDownload = {
      ...searchParams,
      created: created_at,
      updated: updated_at,
      firstName: first_name,
      lastName: last_name,
      fullName: full_name,
      emails: email,
      dateOfBirth: birthday,
      addedToMailing: added_to_mailing,
      colleaguesLink: colleague_link,
      colleagues: colleague_name,
      comments: comment,
      lastTouch: last_touch,
      linkedIn: linkedin,
      mailingTool: mailing_tool,
      myNotes: my_notes,
      phones: phone,
      saleStatus: sale?.status,
      saleCreated: sale?.created_at,
      saleLink: sale?.link,
      otherSocialNetworks: social_networks,
      companyLinkedIn: company?.linkedin,
      cto: company?.sto_full_name,
      typeOfCompany: company?.type,
      founded: company?.founded
    };
    const searchKeys = Object.keys(newSearch || {});
    const searchDownload: IContactSearchDownload = {};

    searchKeys.forEach((item: string) => {
      if (!newSearch[item]) {
        return;
      }
      const isAvailableArray = (newSearch[item] as []).length > 0;

      if (Array.isArray(newSearch[item])) {
        if (isAvailableArray) {
          searchDownload[item] = newSearch[item];
        }
      } else {
        const isEmptyObj = Object.keys(newSearch[item] as {}).length === 0;

        const isEmptyMax =
          newSearch[item]?.hasOwnProperty('max') &&
          !(newSearch[item] as { max?: string })?.max;
        const isEmptyMin =
          newSearch[item]?.hasOwnProperty('min') &&
          !(newSearch[item] as { min?: string })?.min;
        if (!isEmptyObj && !isEmptyMax && !isEmptyMin) {
          searchDownload[item] = newSearch[item];
        }
      }
    });
    setDisabled(true);
    await downLoadReport({
      ...filterSettings,
      limit: total,
      sort: {
        fieldName: 'created',
        typeSort: sort?.type_sort || 'ASC'
      },
      search: searchDownload,
      typeFile: 'csv'
    });
    setDisabled(false);
  };

  return (
    <div className={sn('tooltip')}>
      <CommonIcon
        IconComponent={Publish}
        className={sn('table-search__icon')}
        onClick={onDownload(filterSettings)}
        disabled={disabled}
      />
      <span className={sn('tooltipText')}>Export contacts to the file</span>
    </div>
  );
};
