export const setToken = (token: string) => {
  document.cookie = `token=${token}`;
};
