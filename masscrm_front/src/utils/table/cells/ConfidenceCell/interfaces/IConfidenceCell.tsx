export interface IConfidenceCell {
  id: number;
  value?: number;
  disabled?: boolean;
}

export interface IConfidenceEdit {
  handleClose: () => void;
}
