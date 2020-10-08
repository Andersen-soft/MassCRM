export interface IContactCell {
  id: number;
  value?: Array<string>;
  type: 'emails' | 'phones' | 'note';
}
