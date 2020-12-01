import React, { FC, useCallback } from 'react';
import {
  changeContactsResponsible,
  getAddContactList,
  searchUsers
} from 'src/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterSettings, getUser } from 'src/selectors';
import { inputStyle } from 'src/styles/CommonInput.style';
import debounce from 'lodash.debounce';
import { useLocation } from 'react-router';
import { MoreInformation, SearchInput } from '../../../../index';
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
  const filterSettings = useSelector(getFilterSettings);
  const currentUser = useSelector(getUser);
  const isManager = Object.keys(currentUser.roles).includes('manager');
  const styleInput = inputStyle();

  const handleSetResponsibleSearch = useCallback(
    debounce((value: string) => {
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

  const successCallback = () => dispatch(getAddContactList(filterSettings));

  const handleChangeResponsible = (value: string) => {
    if (selectedContacts.length && searchUserList) {
      const newResponsible = searchUserList.find(
        ({ name, surname }) => `${name} ${surname}` === value
      );
      if (location.search.includes('selectAll=on')) {
        changeContactsResponsible([], newResponsible?.id, filterSettings).then(
          successCallback
        );
      } else {
        changeContactsResponsible(selectedContacts, newResponsible?.id).then(
          successCallback
        );
      }
    }
  };

  return isManager && isFullTable && selectedContacts.length ? (
    <MoreInformation
      tooltip='Change Responsible'
      icon={ChangeResponsibleIcon}
      popperInfo={
        <SearchInput
          placeholder='Responsible'
          name='Responsible'
          items={autocomplete}
          onChange={handleSetResponsibleSearch}
          onSelect={handleChangeResponsible}
          className={styleInput.minWidthResponsible}
        />
      }
    />
  ) : null;
};
