type ValueType = string | (() => JSX.Element) | false | JSX.Element;

export interface IInfoItem {
  title: string;
  value?: ValueType;
  showMore?: string | false | JSX.Element;
  renderItem: (value?: ValueType, label?: string) => JSX.Element;
}
