export const findSubstr = (targetString: string, substrForSearch: string) =>
  targetString
    .toLocaleLowerCase()
    .includes(substrForSearch.toLocaleLowerCase());
