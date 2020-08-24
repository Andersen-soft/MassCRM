export type IColleagueFormState = { full_name: string; link?: string };

export interface IContactColleagueValues {
  [index: string]: number | string | undefined;
  full_name: string;
  link?: string;
}

export type IContactColleagues = Array<IContactColleagueValues>;

export interface IContactColleagueInput {
  items: IContactColleagues;
  value?: string;
  errorMessage?: string;
  onChange: (fieldName: string, value: IContactColleagues) => void;
}

export interface IContactColleagueForm {
  anchorForm: { el: HTMLElement | SVGElement; index: number } | null;
  data: IContactColleagueValues | null;
  onChange: (data: IContactColleagueValues, index: number) => void;
  onClose: () => void;
}

export interface IContactColleagueList {
  items: IContactColleagues;
  onEditHandler: (index: number, event: HTMLElement | SVGElement) => void;
  onRemoveHandler: (index: number) => void;
}
