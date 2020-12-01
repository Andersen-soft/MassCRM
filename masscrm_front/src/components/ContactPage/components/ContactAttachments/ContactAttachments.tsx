import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAttachments,
  uploadContactFile,
  deleteAttachment
} from 'src/actions';
import { getAttachmentsSelector } from 'src/selectors';
import { Attachments } from 'src/components/common/Attachments';

export const ContactAttachments: FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const attachments = useSelector(getAttachmentsSelector);
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

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Attachments
      attachments={attachments}
      uploadHandler={uploadHandler}
      deleteHandler={deleteHandler}
    />
  );
};
