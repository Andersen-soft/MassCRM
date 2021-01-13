import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from 'src/actions';
import { getNotification } from 'src/selectors';
import { Attachments, CommonAlert, TAlertType } from 'src/components/common';
import { FILES_ERRORS, MAX_ALLOWED_FILE_SIZE } from 'src/constants';
import { convertBytesToMegabytes, ATTACHMENTS_CONFIG } from './helpers';

export const PageAttachments: FC<{ id: number; name: string }> = ({
  id,
  name
}) => {
  const [notificationType, setNotificationType] = useState<TAlertType>();
  const dispatch = useDispatch();
  const attachments = useSelector(ATTACHMENTS_CONFIG[name].selector);
  const notification = useSelector(getNotification);
  const getData = useCallback(
    () => dispatch(ATTACHMENTS_CONFIG[name].getData(id)),
    [dispatch, id]
  );

  const uploadHandler = useCallback(
    file => {
      const fileSizeInMegabytes = convertBytesToMegabytes(file.size);
      const isFileBig = Number(fileSizeInMegabytes) > MAX_ALLOWED_FILE_SIZE;
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
        open={Boolean(notification)}
        onClose={handleCloseNotification}
        errorMessage={notification}
        type={notificationType}
      />
    </>
  );
};
