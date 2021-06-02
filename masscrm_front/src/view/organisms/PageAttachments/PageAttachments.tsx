import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAttachment,
  deleteCompanyAttachment,
  getAttachments,
  getCompanyAttachments,
  uploadCompanyFile,
  uploadContactFile,
  getAttachmentsSelector,
  getCompanyAttachmentsSelector,
  setNotification,
  getNotificationSelector
} from 'src/store/slices';
import { CommonAlert } from 'src/view/atoms';
import { AlertType } from 'src/interfaces';
import { FILES_ERRORS, MAX_ALLOWED_FILE_SIZE } from './constants';
import { Attachments } from './components';
import { convertBytesToMegabytes, IAttachemntsConfig } from './helpers';

interface IProps {
  id: number;
  name: string;
}

export const PageAttachments: FC<IProps> = ({ id, name }) => {
  const [notificationType, setNotificationType] = useState<AlertType>();

  const dispatch = useDispatch();

  const ATTACHMENTS_CONFIG: IAttachemntsConfig = {
    contact: {
      selector: getAttachmentsSelector,
      getData: contactId => getAttachments(contactId),
      uploadHandler: (file, contactId) => uploadContactFile(file, contactId),
      deleteHandler: (idAttachment, contactId) =>
        deleteAttachment(idAttachment, contactId)
    },
    company: {
      selector: getCompanyAttachmentsSelector,
      getData: contactId => getCompanyAttachments(contactId),
      uploadHandler: (file, contactId) => uploadCompanyFile(file, contactId),
      deleteHandler: (idAttachment, contactId) =>
        deleteCompanyAttachment(idAttachment, contactId)
    }
  };

  const attachments = useSelector(ATTACHMENTS_CONFIG[name].selector);
  const notification = useSelector(getNotificationSelector);

  const getData = useCallback(
    () => dispatch(ATTACHMENTS_CONFIG[name].getData(id)),
    [dispatch, id]
  );

  const uploadHandler = useCallback(
    file => {
      const fileSizeInMegabytes = convertBytesToMegabytes(file.size);
      const isFileBig = +fileSizeInMegabytes > MAX_ALLOWED_FILE_SIZE;
      const isFileExist = attachments.some(
        attachment => attachment.fileName === file.name
      );

      if (isFileBig || isFileExist) {
        setNotificationType('error');
        dispatch(
          setNotification(
            isFileBig ? FILES_ERRORS.bigFile : FILES_ERRORS.existFile
          )
        );
        return;
      }
      dispatch(ATTACHMENTS_CONFIG[name].uploadHandler(file, id));
    },
    [attachments]
  );

  const deleteHandler = useCallback(
    (idAttachment: number) =>
      dispatch(ATTACHMENTS_CONFIG[name].deleteHandler(idAttachment, id)),
    []
  );

  const handleCloseNotification = useCallback(
    () => dispatch(setNotification('')),
    []
  );

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <Attachments
        attachments={attachments}
        uploadHandler={uploadHandler}
        deleteHandler={deleteHandler}
      />
      <CommonAlert
        open={!!notification}
        onClose={handleCloseNotification}
        errorMessage={notification}
        type={notificationType}
      />
    </>
  );
};
