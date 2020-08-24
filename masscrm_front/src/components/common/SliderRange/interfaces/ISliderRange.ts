export interface ISliderRange {
  name: string;
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
  disabled?: boolean;
}
