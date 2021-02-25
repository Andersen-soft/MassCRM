import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import React, { FC, useCallback, useState, useContext } from 'react';
import {
  CancelEditModal,
  DialogCloseIcon,
  ContactByEmail,
  CommonButton
} from 'src/components/common';
import { styleNames } from 'src/services';
import { IContact } from 'src/interfaces';
import { ErrorEmitterContext } from 'src/context';
import { getErrorsList } from 'src/utils/errors';
import {
  extractSubstring,
  transformFirstLetterToUpperCase
} from 'src/utils/string';

import {
  updateContact,
  setContactForBindingToCompany,
  setIsContactForBindingToCompanyUpdated
} from 'src/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContactForBindingToCompany,
  getIsContactForBindingToCompanyUpdated
} from 'src/selectors';
import styles from './AddRelatedContactModal.scss';
import { modalStyles } from './AddRelatedContactModal.style';

const sn = styleNames(styles);

interface IAddRelatedContactModal {
  open: boolean;
  handleClose: Function;
  companyId: number;
  fetchCompanyWithRelatedContactsRequest: Function;
}

interface IGetErrorTitlesArgs {
  condition: string;
  errorKey: string;
  titleToExtract: string;
}

export const AddRelatedContactModal: FC<IAddRelatedContactModal> = ({
  handleClose,
  open,
  companyId,
  fetchCompanyWithRelatedContactsRequest
}) => {
  const style = modalStyles();
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  const { errorsEventEmitter, handleClearErrors } = useContext(
    ErrorEmitterContext
  );

  const dispatch = useDispatch();
  const contactForBindingToCompany = useSelector(getContactForBindingToCompany);
  const isContactForBindingToCompanyUpdated = useSelector(
    getIsContactForBindingToCompanyUpdated
  );

  const closePopup = useCallback(() => {
    handleClearErrors();
  }, []);

  const handleToggleMessage = useCallback(
    (shouldClose: boolean) => (): void => {
      setOpenMessage(false);

      isContactForBindingToCompanyUpdated &&
        dispatch(
          setIsContactForBindingToCompanyUpdated({
            isContactForBindingToCompanyUpdated: false
          })
        );

      if (shouldClose) {
        Object.keys(contactForBindingToCompany).length &&
          dispatch(
            setContactForBindingToCompany({ contactForBindingToCompany: {} })
          );

        handleClose();
      }
    },
    [contactForBindingToCompany, isContactForBindingToCompanyUpdated]
  );

  const handleToggle = useCallback(() => {
    if (open && !openMessage) {
      setOpenMessage(true);
    } else {
      handleClose();
    }
  }, [open, openMessage, setOpenMessage, handleClose]);

  const onChangeContact = useCallback(
    (setContactFieldValue: (key?: IContact) => void) => (val?: IContact) => {
      dispatch(setContactFieldValue({ contactForBindingToCompany: val }));
    },
    []
  );

  const successCallback = async () => {
    fetchCompanyWithRelatedContactsRequest();

    isContactForBindingToCompanyUpdated &&
      dispatch(
        setIsContactForBindingToCompanyUpdated({
          isContactForBindingToCompanyUpdated: false
        })
      );
    handleClose();
    closePopup();
  };

  const errorCallback = (error: string) => {
    const arrayTitle: string[] = [];
    const parseError = JSON.parse(error);

    const createError = (title: string[]) => {
      errorsEventEmitter.emit('requiredFieldsPopUpErrors', {
        errorsArray: [JSON.stringify(title)]
      });
    };

    const getErrorTitles = (
      condition: string,
      errorKey: string,
      titleToExtract: string
    ) => {
      if (getErrorsList(condition, parseError).length) {
        Object.keys(parseError).forEach((key: string) => {
          if (key.includes(errorKey)) {
            arrayTitle.push(
              titleToExtract === 'position'
                ? 'Title'
                : transformFirstLetterToUpperCase(
                    extractSubstring(parseError[key].toString(), titleToExtract)
                  )
            );
          }
        });
      }
    };

    const getErrorTitlesArgs: { [key: string]: IGetErrorTitlesArgs } = {
      position: {
        condition: 'must be',
        errorKey: 'position',
        titleToExtract: 'position'
      },
      first_name: {
        condition: 'must be',
        errorKey: 'first_name',
        titleToExtract: 'first name'
      },
      last_name: {
        condition: 'must be',
        errorKey: 'last_name',
        titleToExtract: 'last name'
      },
      country: {
        condition: 'is required when gender is not present',
        errorKey: 'location.country',
        titleToExtract: 'country'
      }
    };

    Object.keys(getErrorTitlesArgs).forEach((key: string) => {
      getErrorTitles(
        getErrorTitlesArgs[key].condition,
        getErrorTitlesArgs[key].errorKey,
        getErrorTitlesArgs[key].titleToExtract
      );
    });

    createError(arrayTitle);
  };

  const handleSubmit = useCallback(async () => {
    if (Object.keys(contactForBindingToCompany).length) {
      // props below were excluded since they interfere with the update in the presented form
      // and they're not required for this specific one
      const {
        company,
        mails,
        emails,
        ...neededPropsForContactUpdate
      } = contactForBindingToCompany;

      try {
        await updateContact(
          { ...neededPropsForContactUpdate, company_id: companyId },
          contactForBindingToCompany.id
        );
        successCallback();
      } catch (error) {
        errorCallback(error);
      }
    }
  }, [contactForBindingToCompany]);

  return (
    <>
      <Dialog
        onClose={handleToggle}
        maxWidth='lg'
        open={Boolean(open)}
        classes={{ root: style.modal }}
      >
        <DialogCloseIcon onClick={handleToggle} />
        <DialogTitle>
          <span className='title'>Add new related contact</span>
        </DialogTitle>
        <DialogContent classes={{ root: style.content }}>
          <ContactByEmail
            id={companyId}
            name='email'
            value={
              contactForBindingToCompany ? contactForBindingToCompany.id : ''
            }
            onSelect={onChangeContact(setContactForBindingToCompany)}
            placeholder='Contact`s Email'
            //  force update is required here in order to clear input field ('Contacts Email')
            // after update of contactForBindingToCompany
            key={Number(isContactForBindingToCompanyUpdated)}
          />
          <div className={sn('wrapper-btns')}>
            <CommonButton
              text='Cancel'
              type='reset'
              onClickHandler={handleToggle}
            />
            <CommonButton
              text='Submit'
              color='yellow'
              onClickHandler={handleSubmit}
            />
          </div>
        </DialogContent>
      </Dialog>
      <CancelEditModal
        open={openMessage}
        onClose={handleToggleMessage(false)}
        onConfirm={handleToggleMessage(true)}
        message='Are you sure that you want close that form?'
      />
    </>
  );
};
