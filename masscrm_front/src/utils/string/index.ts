export const transformFirstLetterToUpperCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const extractSubstring = (str: string, searchStr: string) => {
  const firstLetterIndexSubstrMatch = str
    .toLowerCase()
    .indexOf(searchStr.toLowerCase());

  const lastLetterIndexSubstrMatch =
    searchStr.length + firstLetterIndexSubstrMatch;

  const extractedMatchedStr = str.slice(
    firstLetterIndexSubstrMatch,
    lastLetterIndexSubstrMatch
  );

  return extractedMatchedStr;
};

export const findSubstr = (targetString: string, substrForSearch: string) =>
  targetString
    .toLocaleLowerCase()
    .includes(substrForSearch.toLocaleLowerCase());

export const getTrimmedValue = (value: string | null) => value && value.trim();

export const cutStringWithEllipsis = (str: string, len: number) =>
  str.length > len ? `${str.substr(0, len)}...` : str;
