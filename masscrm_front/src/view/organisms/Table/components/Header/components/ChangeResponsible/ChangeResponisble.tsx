import React, { FC, useCallback, useContext, useState, useEffect } from 'react';
import {
  changeContactsResponsible,
  getAddContactList,
  resetUsersFullName,
  searchUsers,
  getUser
} from 'src/store/slices';
import { useDispatch, useSelector } from 'react-redux';
import { commonInputStyles } from 'src/styles';
import { debounce } from 'lodash';
import { FiltersContext } from 'src/contexts';
import { getTrimmedValue } from 'src/utils';
import { ITableConfig, IUser } from 'src/interfaces';
import { SearchInput, MoreInformation } from 'src/view/organisms';
import { MANAGER } from 'src/constants';
import { ChangeResponsibleIcon } from '.';

interface IProps {
  config: ITableConfig;
  searchUserList: IUser[];
  autocomplete: string[];
  isFullTable?: boolean;
}

export const ChangeResponsible: FC<IProps> = ({
  config,
  searchUserList,
  autocomplete,
  isFullTable
}) => {
  const dispatch = useDispatch();

  const selectedContacts = config.body.selectedRows || [];

  const { getRequestValues } = useContext(FiltersContext);

  const currentUser = useSelector(getUser);

  const isManager = Object.keys(currentUser.roles).includes(MANAGER);

  const commonInputClasses = commonInputStyles();

  const [localValue, setLocalValue] = useState('');

  const handleSetResponsibleSearch = useCallback(
    debounce((value: string) => {
      setLocalValue(value);

      getTrimmedValue(value || '') &&
        dispatch(
          searchUsers({
            search: {
              fullName: value
            },
            sort: {
              fieldName: 'fullName',
              typeSort: 'ASC'
            }
          })
        );
    }, 300),
    []
  );

  const successCallback = () => {
    setLocalValue('');
    dispatch(getAddContactList(getRequestValues({})));
  };

  const handleChangeResponsible = (value: string) => {
    if (!getTrimmedValue(value || '')) {
      autocomplete.length && dispatch(resetUsersFullName({ fullName: [] }));
      return;
    }

    if (selectedContacts.length && searchUserList) {
      const newResponsible = searchUserList.find(
        ({ name, surname }) => `${name} ${surname}` === getTrimmedValue(value)
      );
      changeContactsResponsible(selectedContacts, newResponsible?.id).then(
        successCallback
      );
    }
  };

  useEffect(() => {
    autocomplete.length &&
      !localValue &&
      dispatch(resetUsersFullName({ fullName: [] }));
  }, [autocomplete]);

  return isManager && isFullTable && selectedContacts.length ? (
    <MoreInformation
      tooltip='Change Responsible'
      icon={ChangeResponsibleIcon}
      popperInfo={
        <SearchInput
          placeholder='Responsible'
          name='Responsible'
          value={localValue || ''}
          items={autocomplete}
          onChange={handleSetResponsibleSearch}
          onSelect={handleChangeResponsible}
          className={commonInputClasses.minWidthResponsible}
        />
      }
    />
  ) : null;
};
