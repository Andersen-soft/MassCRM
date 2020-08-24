export interface ICommonButtonProps {
  text: string;
  className?: string;
  color?: 'white' | 'yellow';
  size?: 'small' | 'big';
  onClickHandler?: (event?: any) => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit' | undefined;
}
