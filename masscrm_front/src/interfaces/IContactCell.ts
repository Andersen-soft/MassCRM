export interface IContactCell {
  id: number;
  value?: string[];
  type: 'emails' | 'phones' | 'note';
  doubleClickEdit?: boolean;
}
