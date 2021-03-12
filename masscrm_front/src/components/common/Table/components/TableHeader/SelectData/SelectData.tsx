import React, { FC, useCallback, useMemo } from 'react';
import { ArrowDropDown } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { styleNames } from 'src/services';
import { MoreInformation, CustomCheckBox } from 'src/components/common';
import { ISelectData } from 'src/components/common/Table/interfaces';
import { getStringifiedItemsWithoutChosenOnes } from 'src/utils/array/filters';
import style from './SelectData.scss';

const sn = styleNames(style);

export const SelectData: FC<ISelectData> = ({
  isCheckedAll,
  data,
  currentPageStringified,
  param,
  selectAllOnPage,
  checkedContactsArray,
  contactsIDs
}) => {
  const location = useLocation();
  const history = useHistory();

  const onSelectHandler = useCallback(
    (value: boolean) => {
      if (value) {
        const contactsCheckedOnOtherPages = (
          checkedContactsArray?.filter(
            (contact: number) => !contactsIDs?.includes(contact)
          ) || []
        ).join(',');

        // eslint-disable-next-line no-unused-expressions
        contactsCheckedOnOtherPages.length
          ? param.set('selectedContacts', contactsCheckedOnOtherPages)
          : param.delete('selectedContacts');

        param.set('selectAllOnPage', currentPageStringified);
      } else {
        // eslint-disable-next-line no-lonely-if
        param.delete('selectAllOnPage');

        checkedContactsArray?.some(contact => contactsIDs.includes(contact)) &&
          param.set(
            'selectedContacts',
            getStringifiedItemsWithoutChosenOnes(
              checkedContactsArray,
              contactsIDs
            )
          );
      }

      history.push({
        search: param.toString()
      });
    },
    [location, data]
  );

  const setDataOfSelection = useCallback(
    () =>
      onSelectHandler(
        !selectAllOnPage ||
          (selectAllOnPage && selectAllOnPage === currentPageStringified)
          ? !selectAllOnPage
          : !!selectAllOnPage
      ),
    [location, data]
  );

  const selectList = useMemo(
    () => (
      <List component='nav' aria-label='secondary mailbox folders'>
        <ListItem
          button
          component='a'
          selected={selectAllOnPage === currentPageStringified}
          onClick={setDataOfSelection}
        >
          <ListItemText primary='All on the page' />
        </ListItem>
      </List>
    ),
    [location, data]
  );

  return (
    <div className={sn('wrapper')}>
      <CustomCheckBox value={isCheckedAll} onChange={onSelectHandler} />
      <MoreInformation icon={ArrowDropDown} popperInfo={selectList} autoClose />
    </div>
  );
};
