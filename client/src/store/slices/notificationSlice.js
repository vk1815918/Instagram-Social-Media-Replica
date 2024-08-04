import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: null,
    unread: 0,
    status: null,
  },
  reducers: {
    updateNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
      state.status = action.payload.status;
      state.unread = action.payload.unread
    },
  },
});

export const { updateNotifications } = notificationSlice.actions;
export default notificationSlice;
