// this will remove username from message and show only the message
export const notifcationMessageExtractor = (data) => {
  return data.split(" ").slice(1, data.split(" ").length).join(" ");
};
