import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  setSelectedContacts,
  setSelectedReportContactsAction
} from 'src/actions';
import { TableBase } from 'src/components/common';
import {
  ITableConfig,
  ITableRow
} from 'src/components/common/Table/interfaces';
import {
  getReportFilter,
  getReportTotalCount,
  getSelectedContacts,
  getShowCountReport,
  getUserRoles
} from 'src/selectors';
import { getSelectedEntity } from 'src/utils/selectedEntity';
import {
  reportTableConfigForManager,
  reportTableMapForManager,
  reportTableMapForNC2,
  reportTableMapForNC1,
  reportTableConfigForNC1,
  reportTableConfigForNC2
} from 'src/utils/table';

// TOD ts
export const ReportTable: FC<any> = ({ reportPage }) => {
  const totalCount = useSelector(getReportTotalCount);
  const showCount = useSelector(getShowCountReport);
  // TODO use reportData below instead of mock when backend will be implemented
  // const reportData = useSelector(getReportSelector);
  const userRole = useSelector(getUserRoles);
  const filtersState = useSelector(getReportFilter);

  // TODO replace by real data when backend will be implemented
  const mockContactsDataNC1 = [
    {
      id: 1,
      date: '21.07.2020',
      created: '21.07.2020',
      duplicates: 30,
      inReview: 1,
      waiting: 1,
      declined: 1,
      totalErrors: 1
    }
  ];

  const mockContactsDataNC2 = [
    {
      id: 1,
      date: '21.07.2020',
      created: '21.07.2020',
      updated: '21.07.2020',
      total: 1,
      duplicates: 30,
      inReview: 1,
      waiting: 1,
      declined: 1,
      totalErrors: 1
    }
  ];

  const mockContactsDataManager = [
    {
      id: 1,
      employee: 'john doe',
      role: 'nc1',
      created: '21.07.2020',
      updated: '21.07.2020',
      total: 1,
      duplicates: 30,
      inReview: 1,
      waiting: 1,
      declined: 1,
      totalErrors: 123
    },
    {
      id: 2,
      employee: 'john doe',
      role: 'nc1',
      created: '21.07.2020',
      updated: '21.07.2020',
      total: 1,
      duplicates: 30,
      inReview: 1,
      waiting: 1,
      declined: 1,
      totalErrors: 123
    }
  ];

  const getDataTable = () => {
    if (userRole?.nc1) return mockContactsDataNC1.map(reportTableMapForNC1);
    if (userRole?.nc2) return mockContactsDataNC2.map(reportTableMapForNC2);
    if (userRole?.manager)
      return mockContactsDataManager.map(reportTableMapForManager);
    return [] as ITableRow[];
  };

  const count = totalCount && Math.ceil(totalCount / showCount);

  const selectedContacts = useSelector(
    getSelectedContacts(
      getSelectedEntity({
        reportContactsVal: 'selectedReportContacts',
        reportPage
      })
    )
  );

  const handleSetSelectedContacts = useMemo(
    () =>
      setSelectedContacts(
        getSelectedEntity({
          reportVal: 'selectedReportContacts',
          reportCompProp: reportPage
        }),
        getSelectedEntity({
          reportVal: setSelectedReportContactsAction,
          reportCompProp: reportPage
        })
      ),
    [setSelectedReportContactsAction, reportPage]
  );

  const getReportTableConfig = () => {
    if (userRole?.nc1) return reportTableConfigForNC1;
    if (userRole?.nc2) return reportTableConfigForNC2;
    if (userRole?.manager) return reportTableConfigForManager;
    return {} as ITableConfig;
  };

  return (
    <>
      <TableBase
        config={getReportTableConfig()}
        filtersValues={filtersState}
        data={getDataTable()}
        count={count}
        setSelectedContacts={handleSetSelectedContacts}
        selectedContacts={selectedContacts}
      />
    </>
  );
};

export default ReportTable;
