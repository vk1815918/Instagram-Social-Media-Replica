import store from "@/store";

export const isAuthor = (userId) => {
  const authId = store.getState().auth?.user?.data?._id || null;
  if (!authId) {
    return null;
  }
  return authId === userId;
};

export const canDeleteComment = (commentedUserId) => {
  const authId = store.getState().auth?.user?.data?._id || null;
  if (!authId) {
    return null;
  }
  return authId === commentedUserId;
};
