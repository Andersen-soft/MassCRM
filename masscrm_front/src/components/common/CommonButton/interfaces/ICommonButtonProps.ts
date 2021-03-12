export interface ICommonButtonProps {
  text: string;
  dataTestId?: string;
  className?: string;
  color?: 'white' | 'yellow';
  size?: 'small' | 'big';
  align?: 'alignRight';
  onClickHandler?: (event?: any) => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit' | undefined;
}
