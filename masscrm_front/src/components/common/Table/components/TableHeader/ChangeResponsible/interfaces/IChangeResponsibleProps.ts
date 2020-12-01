import { IUser } from 'src/interfaces';
import { ITableConfig } from '../../../../interfaces';

export interface IChangeResponsibleProps {
  config: ITableConfig;
  searchUserList: IUser[];
  autocomplete: string[];
  isFullTable?: boolean;
}
