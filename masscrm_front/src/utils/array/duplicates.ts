interface IDuplicates {
  [key: string]: number;
}

export const findDuplicates = (
  arr: Array<string | number>,
  skip?: Array<string | number>
) => {
  const count: IDuplicates = Object.create(null);

  arr.forEach((item: string | number) => {
    if (!item || skip?.indexOf(item) !== -1) {
      return;
    }

    if (!count[item]) {
      count[item] = 1;
    } else {
      count[item] += 1;
    }
  });

  return Object.keys(count).reduce((result: IDuplicates, key: string) => {
    const duplicatesNum = count[key];

    if (duplicatesNum > 1) {
      const newResult = { ...result };
      newResult[key] = duplicatesNum;

      return newResult;
    }

    return result;
  }, {});
};

export const countDuplicates = (
  arr: Array<string | number>,
  skip?: Array<string | number>
) =>
  Object.values(findDuplicates(arr, skip)).reduce(
    (acc: number, duplicates: number) => acc + duplicates,
    0
  );
