import { ISearchItem } from 'src/components/common/SearchInput/interfaces';
import { IUser } from 'src/interfaces';

export const formatSearchList = (usersList: IUser[]): Array<ISearchItem> =>
  usersList.map(
    (userInfo: IUser): ISearchItem => ({
      key: String(userInfo.id),
      label: `${userInfo.name} ${userInfo.surname}`
    })
  );
