export const isOwnAccount = (authId, userId) => {
  return authId.toString() === userId.toString();
};
