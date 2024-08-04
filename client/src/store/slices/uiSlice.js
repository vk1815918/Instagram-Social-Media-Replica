import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastPage: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Used for loader purpose for suspense
    updateLastPage: (state, action) => {
      state.lastPage =
        action.payload;
    },
  },
});

export const { updateLastPage } = uiSlice.actions;
export default uiSlice;
