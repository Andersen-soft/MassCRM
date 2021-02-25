import React, { FC, useCallback, useContext, useState, useEffect } from 'react';
import {
  changeContactsResponsible,
  getAddContactList,
  resetUsersFullName,
  searchUsers
} from 'src/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'src/selectors';
import { inputStyle } from 'src/styles/CommonInput.style';
import debounce from 'lodash.debounce';
import { useLocation } from 'react-router';
import { FilterContext } from 'src/context';
import { MoreInformation, SearchInput } from 'src/components/common';
import { getTrimmedValue } from 'src/utils/string';
import { IChangeResponsibleProps } from './interfaces';
import { ChangeResponsibleIcon } from './ChangeResponsibleIcon';

export const ChangeResponsible: FC<IChangeResponsibleProps> = ({
  config,
  searchUserList,
  autocomplete,
  isFullTable
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedContacts: number[] = config.body.selectedRows || [];
  const { getRequestValues } = useContext(FilterContext);
  const currentUser = useSelector(getUser);
  const isManager = Object.keys(currentUser.roles).includes('manager');
  const styleInput = inputStyle();

  const [localValue, setLocalValue] = useState('');

  const handleSetResponsibleSearch = useCallback(
    debounce((value: string) => {
      setLocalValue(value);

      getTrimmedValue(value) &&
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
    if (!getTrimmedValue(value)) {
      autocomplete.length && dispatch(resetUsersFullName({ fullName: [] }));
      return;
    }

    if (selectedContacts.length && searchUserList) {
      const newResponsible = searchUserList.find(
        ({ name, surname }) => `${name} ${surname}` === getTrimmedValue(value)
      );
      if (location.search.includes('selectAll=on')) {
        changeContactsResponsible(
          [],
          newResponsible?.id,
          getRequestValues({})
        ).then(successCallback);
      } else {
        changeContactsResponsible(selectedContacts, newResponsible?.id).then(
          successCallback
        );
      }
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
          className={styleInput.minWidthResponsible}
        />
      }
    />
  ) : null;
};
