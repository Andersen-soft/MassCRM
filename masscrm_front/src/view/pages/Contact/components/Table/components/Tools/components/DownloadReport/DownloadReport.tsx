import React, { useState, useCallback, useMemo, FC } from 'react';
import { Publish } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { CommonIcon, CustomCheckBox } from 'src/view/atoms';
import {
  getContactsLength,
  downLoadReport,
  getCountDownloadReport
} from 'src/store/slices';
import { IContactSearchDownload, IContactFilter } from 'src/interfaces';
import { Dialog, Tooltip } from '@material-ui/core';
import { deleteEmptyFields } from 'src/utils';
import { DefaultPopup } from 'src/view/molecules';
import { tooltipStyles } from 'src/styles';
import { TOP_START } from 'src/constants';
import { DownloadReportModal } from 'src/view/modals';
import { useStyles } from './DownloadReport.styles';

interface IProps {
  selectedContacts: number[];
  filters: IContactFilter;
}

export const DownloadReport: FC<IProps> = ({ selectedContacts, filters }) => {
  const totalContactsLength = useSelector(getContactsLength);
  const total = useSelector(getContactsLength);

  const [disabled, setDisabled] = useState(false);
  const [exportCount, setExportCount] = useState<number>(0);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showPreReportModal, setShowPreReportModal] = useState<boolean>(false);
  const [inWork, setInWork] = useState<boolean>(false);

  const styles = useStyles();
  const tooltipClasses = tooltipStyles();

  const closePopup = useCallback(() => setShowReportModal(false), []);

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
    responsible_roles,
    ...searchParams
  } = filters.search || {};

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
    in_blacklist,
    responsible_roles,
    has_jobs: company?.has_jobs,
    jobs_status: company?.jobs_status
  };

  const filterParams = {
    ...filters,
    ids: selectedContacts,
    limit: total,
    sort: {
      fieldName: 'created',
      typeSort: filters.sort?.type_sort || 'ASC'
    },
    search: deleteEmptyFields(newSearch),
    typeFile: 'csv',
    isInWork: inWork ? 1 : 0
  };

  const onDownload = async () => {
    setShowPreReportModal(false);
    setDisabled(true);
    setShowReportModal(true);
    await downLoadReport(filterParams);
    setDisabled(false);
  };

  const handleClickPreReportModal = async () => {
    if (!showPreReportModal) {
      await getCountDownloadReport(filterParams).then(count =>
        setExportCount(+count)
      );
    }
    setShowPreReportModal(prev => !prev);
    setInWork(false);
  };

  const preExportQuestion = useMemo(
    () => (
      <p className={styles.preExportQuestion}>
        <span>Are you sure you want to export these</span>
        <strong>{` ~ ${exportCount} `}</strong>
        <span>contacts?</span>
      </p>
    ),
    [exportCount]
  );

  const handleChangeInWork = () => setInWork((prev: boolean) => !prev);

  return (
    <>
      <Tooltip
        title='Export contacts to the file'
        classes={tooltipClasses}
        placement={TOP_START}
      >
        <div className={styles.tooltip} data-testid='export_button'>
          <CommonIcon
            IconComponent={Publish}
            onClick={handleClickPreReportModal}
            disabled={disabled || !totalContactsLength}
          />
          {/* <span className={styles.tooltipText}>
            Export contacts to the file
          </span> */}
        </div>
      </Tooltip>
      <DownloadReportModal
        open={showReportModal}
        onClose={closePopup}
        message='Data export will take time. You will be notified once this action is complete.'
      />
      <Dialog open={showPreReportModal}>
        <DefaultPopup
          questionMessage={
            <div className={styles.preExport}>
              {preExportQuestion}
              <div className={styles.preExportCheckboxBlock}>
                <CustomCheckBox onChange={handleChangeInWork} value={inWork} />
                <p>Mark contacts as in work</p>
              </div>
            </div>
          }
          onClose={handleClickPreReportModal}
          onConfirm={onDownload}
        />
      </Dialog>
    </>
  );
};
