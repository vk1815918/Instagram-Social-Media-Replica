import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("accessToken") || null,
  user: { status: null, data: null },
  isLogedin: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLogedin = !!action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.user.data = null;
      state.user.status = null;
      state.isLogedin = false;
      localStorage.removeItem("accessToken");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user.data = null;
    },
  },
});

export const { setToken, clearToken, setUser, clearUser } = authSlice.actions;
export default authSlice;
