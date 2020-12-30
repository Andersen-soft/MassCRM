import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAttachments,
  uploadContactFile,
  deleteAttachment,
  setNotification
} from 'src/actions';
import { getAttachmentsSelector, getNotification } from 'src/selectors';
import { Attachments, CommonAlert } from 'src/components/common';

export const ContactAttachments: FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const attachments = useSelector(getAttachmentsSelector);
  const notification = useSelector(getNotification);
  const getData = useCallback(() => dispatch(getAttachments(id)), [
    dispatch,
    getAttachments,
    id
  ]);
  const uploadHandler = useCallback(
    file => dispatch(uploadContactFile(file, id)),
    []
  );
  const deleteHandler = useCallback(
    (idAttachment: number) => dispatch(deleteAttachment(idAttachment, id)),
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
        type='error'
      />
    </>
  );
};
