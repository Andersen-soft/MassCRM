import { ISocialNetwork } from 'src/interfaces';

export interface INetworkCell {
  id: number;
  value?: Array<ISocialNetwork>;
}

export interface INetworkEdit {
  handleClose: () => void;
}
