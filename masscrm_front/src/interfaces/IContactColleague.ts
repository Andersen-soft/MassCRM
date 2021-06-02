interface IContactColleagueValues {
  [index: string]: number | string | undefined;
  full_name: string;
  link?: string;
}

export type ContactColleagues = IContactColleagueValues[];
