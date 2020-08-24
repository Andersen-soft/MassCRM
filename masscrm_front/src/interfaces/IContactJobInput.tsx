export interface IContactJobValues {
  [index: string]: string;
  job: string;
  skills: string;
  link: string;
}

export type IContactsJobs = Array<IContactJobValues>;

export interface IJobFormState {
  vacancies: IContactsJobs;
}

export interface IContactJobRow {
  arrayPosition: 'first' | 'last';
  jobs: IContactsJobs;
  indexCorrection: number;
  onEditHandler: (index: number, event: EventTarget) => void;
  onRemoveHandler: (index: number) => void;
}

export interface IContactJobInput {
  vacancies: IContactsJobs;
  onChange: (fieldName: string, value: IContactsJobs) => void;
  errorMessage?: string;
}

export interface IContactJobForm {
  anchorForm: { el: HTMLElement; index: number } | null;
  data: IContactJobValues | null;
  onChange: (data: IContactJobValues, index: number) => void;
  onClose: () => void;
}
