export const getBouncesValue = (bouncesValues: string[]) => {
  return bouncesValues.map(bouncesValue => (bouncesValue === 'Yes' ? 1 : 0));
};
