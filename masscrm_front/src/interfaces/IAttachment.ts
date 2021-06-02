import { IUser } from 'src/interfaces';

export interface IAttachment {
  id?: number;
  contactId: number;
  companyId?: number | null;
  createdAt: string;
  fileName: string;
  updatedAt?: string;
  url: string;
  user: IUser;
}
