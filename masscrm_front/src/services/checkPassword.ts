export const checkPassword = (password: string) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
  const a = password.match(re);

  if (password === a?.[0]) {
    return password;
  }
  return 0;
};
