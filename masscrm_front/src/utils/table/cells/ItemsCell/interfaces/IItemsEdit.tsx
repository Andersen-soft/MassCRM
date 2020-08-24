export interface IItemsEdit {
  value: string | Array<string>;
  items: Array<string>;
  handleClose: () => void;
  sendData: (value: string | Array<string>) => void;
  multi?: boolean;
}
