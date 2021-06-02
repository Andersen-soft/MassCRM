import React, { FC, useCallback, useState, useMemo } from 'react';
import { CommonButton, NoItemsMessage } from 'src/view/atoms';
import { ContactsJobs, IContactJobValues } from 'src/interfaces';
import { Job, AddOrEditJobModal } from './components';
import { SortedVacancies } from './interfaces';
import { useStyles } from './Jobs.styles';

interface IProps {
  vacancies?: ContactsJobs;
  getDeleteJob: (jobId: number) => void;
  getVacancyToEdit: (jobId: number) => void;
  companyId: number;
  vacancyToEdit: IContactJobValues;
}

export const Jobs: FC<IProps> = ({
  vacancies,
  getDeleteJob,
  getVacancyToEdit,
  companyId,
  vacancyToEdit
}) => {
  const [openAddOrEditForm, setOpenAddOrEditForm] = useState(false);
  const [modalType, setModalType] = useState('');

  const styles = useStyles();

  const handleGetDeleteJob = useCallback(
    (id: number) => () => {
      getDeleteJob(id);
    },
    [vacancies]
  );

  const handleGetVacancyToEdit = useCallback(
    (id: number) => () => {
      getVacancyToEdit(id);
    },
    [vacancies]
  );

  const handleModalType = useCallback(
    (val: string) => {
      setModalType(val);
    },
    [modalType]
  );

  const onToggleAddOrEditForm = useCallback(
    (val?: string) => () => {
      const getAddOrEdit = val && val !== 'edit' ? 'add' : 'edit';

      handleModalType(openAddOrEditForm ? '' : getAddOrEdit);
      openAddOrEditForm && handleGetVacancyToEdit(0)();
      setOpenAddOrEditForm(prev => !prev);
    },
    [openAddOrEditForm]
  );

  const sortedVacancies: SortedVacancies = useMemo(() => {
    const comparator = (a: IContactJobValues, b: IContactJobValues) => {
      if (!b.updated_at || !a.updated_at) {
        return b.updated_at ? -1 : 1;
      }
      return Date.parse(a.updated_at) > Date.parse(b.updated_at) ? 1 : -1;
    };
    return vacancies?.sort(comparator);
  }, [vacancies]);

  return (
    <div className={styles.tabWrapper}>
      <div className={styles.wrapper}>
        {sortedVacancies?.length ? (
          <div className={styles.wrappersJobs}>
            {sortedVacancies.map(vacancy => (
              <Job
                key={vacancy.id}
                vacancy={vacancy}
                getDeleteJob={handleGetDeleteJob(vacancy.id as number)}
                getVacancyToEdit={handleGetVacancyToEdit(vacancy.id as number)}
                handleToggleEditForm={onToggleAddOrEditForm}
                open={openAddOrEditForm}
              />
            ))}
          </div>
        ) : (
          <NoItemsMessage items='available jobs' />
        )}
      </div>
      <CommonButton
        text='Add new job'
        onClickHandler={onToggleAddOrEditForm('add')}
        align='alignRight'
      />
      {openAddOrEditForm && (
        <AddOrEditJobModal
          vacancies={vacancies}
          handleClose={onToggleAddOrEditForm}
          open={openAddOrEditForm}
          modalType={modalType}
          companyId={companyId}
          vacancyToEdit={vacancyToEdit}
        />
      )}
    </div>
  );
};
