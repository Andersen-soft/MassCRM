import { IAttachment, IStoreState } from 'src/interfaces';

interface IAttachmentsConfigItem {
  selector: (state: IStoreState) => IAttachment[];
  getData: (id: number) => Function;
  uploadHandler: (file: File, id: number) => Function;
  deleteHandler: (idAttachment: number, id: number) => Function;
}

export interface IAttachemntsConfig {
  [key: string]: IAttachmentsConfigItem;
}

export const convertBytesToMegabytes = (bytes: number): string =>
  (bytes / 1e6).toFixed(1);
