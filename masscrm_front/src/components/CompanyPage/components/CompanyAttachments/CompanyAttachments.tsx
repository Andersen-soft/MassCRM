import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCompanyAttachments,
  uploadCompanyFile,
  deleteCompanyAttachment
} from 'src/actions';
import { getCompanyAttachmentsSelector } from 'src/selectors';
import { Attachments } from 'src/components/common/Attachments';

export const CompanyAttachments: FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const attachments = useSelector(getCompanyAttachmentsSelector);

  const getCompanyData = () => dispatch(getCompanyAttachments(id));

  const uploadHandler = (file: File) => dispatch(uploadCompanyFile(file, id));

  const deleteHandler = (idAttachment: number) =>
    dispatch(deleteCompanyAttachment(idAttachment, id));

  useEffect(() => {
    getCompanyData();
  }, [id]);

  return (
    <Attachments
      attachments={attachments}
      uploadHandler={uploadHandler}
      deleteHandler={deleteHandler}
    />
  );
};
