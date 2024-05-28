export const login = async (
  username: string,
  password: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

export const register = async (
  username: string,
  password: string
): Promise<boolean> => {
  return true;
};
