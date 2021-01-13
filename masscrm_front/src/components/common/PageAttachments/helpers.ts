import {
  deleteAttachment,
  deleteCompanyAttachment,
  getAttachments,
  getCompanyAttachments,
  uploadCompanyFile,
  uploadContactFile
} from 'src/actions';
import { IAttachment, IStoreState } from 'src/interfaces';
import {
  getAttachmentsSelector,
  getCompanyAttachmentsSelector
} from 'src/selectors';

interface IAttachmentsConfigItem {
  selector: (state: IStoreState) => IAttachment[];
  getData: (id: number) => Function;
  uploadHandler: (file: File, id: number) => Function;
  deleteHandler: (idAttachment: number, id: number) => Function;
}

interface IAttachmentsConfig {
  [key: string]: IAttachmentsConfigItem;
}

export const ATTACHMENTS_CONFIG: IAttachmentsConfig = {
  contact: {
    selector: getAttachmentsSelector,
    getData: id => getAttachments(id),
    uploadHandler: (file, id) => uploadContactFile(file, id),
    deleteHandler: (idAttachment, id) => deleteAttachment(idAttachment, id)
  },
  company: {
    selector: getCompanyAttachmentsSelector,
    getData: id => getCompanyAttachments(id),
    uploadHandler: (file, id) => uploadCompanyFile(file, id),
    deleteHandler: (idAttachment, id) =>
      deleteCompanyAttachment(idAttachment, id)
  }
};

export const convertBytesToMegabytes = (bytes: number): string =>
  (bytes / 1e6).toFixed(1);
