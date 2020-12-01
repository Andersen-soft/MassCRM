export interface ISortingObject {
  field_name: string;
  type_sort: string;
}

export interface ISortingState {
  [key: string]: ISortingObject;
  'Contact created': ISortingObject;
  'Contact updated': ISortingObject;
  'Date of birth': ISortingObject;
  'Added to mailing': ISortingObject;
  'Last touch': ISortingObject;
  'Date of use': ISortingObject;
}

export interface ISortingFieldId {
  [key: string]: string | undefined;
  'Contact created'?: string;
  'Contact updated'?: string;
  'Date of birth'?: string;
  'Added to mailing'?: string;
  'Last touch'?: string;
  'Date of use'?: string;
}
