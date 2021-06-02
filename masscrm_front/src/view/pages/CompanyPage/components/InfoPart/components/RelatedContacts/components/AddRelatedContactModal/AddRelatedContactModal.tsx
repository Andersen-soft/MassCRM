import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import React, { FC, useCallback, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CancelEditModal } from 'src/view/modals';
import { CommonButton, DialogCloseIcon } from 'src/view/atoms';
import { IContact } from 'src/interfaces';
import { ErrorsEmitterContext } from 'src/contexts';
import {
  getErrorsList,
  extractSubstring,
  transformFirstLetterToUpperCase
} from 'src/utils';
import {
  updateContact,
  setContactForBindingToCompany,
  setIsContactForBindingToCompanyUpdated,
  getContactForBindingToCompany,
  getIsContactForBindingToCompanyUpdated
} from 'src/store/slices';
import {
  CLOSE_FORM_CONFIRM,
  REQUIRED_FIELDS_POPUP_ERRORS
} from 'src/constants';
import { ContactByEmail } from './components';
import { getErrorTitlesArgs } from './constants';
import { useStyles } from './AddRelatedContactModal.styles';

interface IProps {
  open: boolean;
  handleClose: Function;
  companyId: number;
  fetchCompanyWithRelatedContactsRequest: Function;
}

export const AddRelatedContactModal: FC<IProps> = ({
  handleClose,
  open,
  companyId,
  fetchCompanyWithRelatedContactsRequest
}) => {
  const styles = useStyles();

  const [openMessage, setOpenMessage] = useState<boolean>(false);

  const { errorsEventEmitter, handleClearErrors } = useContext(
    ErrorsEmitterContext
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
      return setOpenMessage(true);
    }
    return handleClose();
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
      errorsEventEmitter.emit(REQUIRED_FIELDS_POPUP_ERRORS, {
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
        open={open}
        classes={{ root: styles.modal }}
      >
        <DialogCloseIcon onClick={handleToggle} />
        <DialogTitle>
          <span className='title'>Add new related contact</span>
        </DialogTitle>
        <DialogContent classes={{ root: styles.content }}>
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
          <div className={styles.wrapperBtns}>
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
        message={CLOSE_FORM_CONFIRM}
      />
    </>
  );
};
