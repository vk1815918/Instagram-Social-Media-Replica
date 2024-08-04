import { configureStore } from "@reduxjs/toolkit";
import api from "../api/index.js";
import authSlice from "./slices/authSlice.js";
import modalSlice from "./slices/modalSlice.js";
import uiSlice from "./slices/uiSlice.js";
import notificationSlice from "./slices/notificationSlice.js";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
    ui: uiSlice.reducer,
    notification: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
