import React, { FC, useCallback, useMemo } from 'react';
import { ArrowDropDown } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { CustomCheckBox } from 'src/view/atoms';
import { getStringifiedItemsWithoutChosenOnes } from 'src/utils';
import { MoreInformation } from 'src/view/organisms';
import { ITableRow } from 'src/interfaces';
import { useStyles } from './SelectData.styles';

interface IProps {
  isCheckedAll: boolean;
  currentPage: number;
  data: ITableRow[];
  setSelectedContacts?: Function;
  param: URLSearchParams;
  selectAllOnPage: number;
  checkedContacts: number[];
  contactsIDs: number[];
}

export const SelectData: FC<IProps> = ({
  isCheckedAll,
  data,
  currentPage,
  param,
  selectAllOnPage,
  checkedContacts,
  contactsIDs
}) => {
  const styles = useStyles();

  const { search: locationSearch } = useLocation();

  const history = useHistory();

  const checkSelectAllOnPageFunc = () => {
    const contactsCheckedOnOtherPages = checkedContacts
      .filter((contact: number) => !contactsIDs.includes(contact))
      .join(',');

    // eslint-disable-next-line no-unused-expressions
    contactsCheckedOnOtherPages.length
      ? param.set('selectedContacts', contactsCheckedOnOtherPages)
      : param.delete('selectedContacts');

    param.set('selectAllOnPage', `${currentPage}`);
  };

  const uncheckSelectAllOnPageFunc = () => {
    if (selectAllOnPage === currentPage) {
      param.delete('selectAllOnPage');

      checkedContacts.some(contact => contactsIDs.includes(contact)) &&
        param.set(
          'selectedContacts',
          getStringifiedItemsWithoutChosenOnes(checkedContacts, contactsIDs)
        );
    } else {
      const contactsCheckedOnCurrentPage = checkedContacts.filter(
        (contact: number) => contactsIDs.includes(contact)
      );

      // eslint-disable-next-line no-unused-expressions
      contactsCheckedOnCurrentPage &&
      contactsCheckedOnCurrentPage.length === checkedContacts.length
        ? param.delete('selectedContacts')
        : param.set(
            'selectedContacts',
            getStringifiedItemsWithoutChosenOnes(
              checkedContacts,
              contactsCheckedOnCurrentPage
            )
          );
    }
  };

  const onSelectHandler = useCallback(
    (value: boolean) => {
      if (value) {
        checkSelectAllOnPageFunc();
      } else {
        uncheckSelectAllOnPageFunc();
      }

      history.push({
        search: param.toString()
      });
    },
    [locationSearch, data]
  );

  const setDataOfSelection = useCallback(
    () =>
      onSelectHandler(
        !selectAllOnPage || (selectAllOnPage && selectAllOnPage === currentPage)
          ? !selectAllOnPage
          : !!selectAllOnPage
      ),
    [locationSearch, data]
  );

  const selectList = useMemo(
    () => (
      <List component='nav' aria-label='secondary mailbox folders'>
        <ListItem
          button
          component='a'
          selected={selectAllOnPage === currentPage}
          onClick={setDataOfSelection}
        >
          <ListItemText primary='All on the page' />
        </ListItem>
      </List>
    ),
    [locationSearch, data]
  );

  return (
    <div className={styles.wrapper}>
      <CustomCheckBox value={isCheckedAll} onChange={onSelectHandler} />
      <MoreInformation icon={ArrowDropDown} popperInfo={selectList} autoClose />
    </div>
  );
};
