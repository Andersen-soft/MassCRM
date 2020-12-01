import React, { useState, useCallback } from 'react';
import { Publish } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import {
  CommonIcon,
  CustomCheckBox,
  DefaultPopUp
} from 'src/components/common';
import { getContactsLength, getFilterSettings } from 'src/selectors';
import { IContactFilter, IContactSearchDownload } from 'src/interfaces';
import { downLoadReport } from 'src/actions';
import { Dialog } from '@material-ui/core';
import { deleteEmptyFields } from 'src/utils/form/objectHelpers';
import style from '../../TableTools.scss';
import { DownloadReportModal } from '../DownloadReportModal';

const sn = styleNames(style);

export const DownloadReport = () => {
  const filterSettings = useSelector(getFilterSettings);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showPreReportModal, setShowPreReportModal] = useState<boolean>(false);
  const [inWork, setInWork] = useState<boolean>(false);
  const total = useSelector(getContactsLength);

  const closePopup = useCallback(() => setShowReportModal(false), []);

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
      in_blacklist,
      ...searchParams
    } = search || {};

    const newSearch: IContactSearchDownload = {
      ...searchParams,
      created: created_at,
      updated: updated_at,
      first_name,
      last_name,
      full_name,
      emails: email,
      birthday,
      added_to_mailing,
      colleague_link,
      colleagues: colleague_name,
      comments: comment,
      last_touch,
      linkedin,
      mailing_tool,
      my_notes,
      service_id,
      phones: phone,
      sale_status: sale?.status,
      sale_created: sale?.created_at,
      sale_link: sale?.link,
      social_networks,
      company: company?.name,
      company_website: company?.website,
      company_linkedin: company?.linkedin,
      company_cto: company?.sto_full_name,
      company_type: company?.type,
      company_size: company?.company_size,
      company_industries: company?.industry,
      company_subsidiary: company?.subsidiary,
      company_holding: company?.holding,
      founded: company?.founded,
      jobs: company?.jobs,
      jobs_skills: company?.skills,
      in_blacklist
    };

    const searchDownload: IContactSearchDownload = deleteEmptyFields(newSearch);

    setShowPreReportModal(false);
    setDisabled(true);
    setShowReportModal(true);
    await downLoadReport({
      ...filterSettings,
      limit: total,
      sort: {
        fieldName: 'created',
        typeSort: sort?.type_sort || 'ASC'
      },
      search: searchDownload,
      typeFile: 'csv',
      isInWork: inWork ? 1 : 0
    });
    setDisabled(false);
  };

  const handleClickPreReportModal = () => {
    setShowPreReportModal(prev => !prev);
    setInWork(false);
  };

  const handleChangeInWork = () => setInWork(prev => !prev);

  return (
    <>
      <div className={sn('tooltip')}>
        <CommonIcon
          IconComponent={Publish}
          className={sn('table-tools__icon')}
          onClick={handleClickPreReportModal}
          disabled={disabled}
        />
        <span className={sn('tooltipText')}>Export contacts to the file</span>
      </div>
      <DownloadReportModal
        open={showReportModal}
        onClose={closePopup}
        message='Data export will take time. You will be notified once this action is complete.'
      />
      <Dialog open={showPreReportModal}>
        <DefaultPopUp
          questionMessage={
            <div className={sn('preExport')}>
              <p className={sn('preExport__question')}>
                Are you sure you want to export these contacts?
              </p>
              <div className={sn('preExport__checkboxBlock')}>
                <CustomCheckBox onChange={handleChangeInWork} value={inWork} />
                <p>Mark contacts as in work</p>
              </div>
            </div>
          }
          onClose={handleClickPreReportModal}
          onConfirm={onDownload(filterSettings)}
        />
      </Dialog>
    </>
  );
};
