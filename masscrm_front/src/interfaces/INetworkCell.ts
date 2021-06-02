import { ISocialNetwork } from './ISocialNetwork';

export interface INetworkCell {
  id: number;
  value?: ISocialNetwork[];
  doubleClickEdit?: boolean;
}
