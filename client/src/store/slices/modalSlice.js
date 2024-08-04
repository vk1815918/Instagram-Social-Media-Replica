import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPost: false,
  comment: false,
  followers: false,
  following: false,
  singlePost: false,
  search: false,
  logout: false,
  editProfilePicture: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = true;
    },
    hideModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = false;
    },
    toggleModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = !state[modalName];
    },
    hideAllModals: (state, action) => {
      const allModals = Object.keys(initialState);
      for (const modal of allModals) {
        state[modal] = false;
      }
    },
  },
});

export const { showModal, hideModal, toggleModal, hideAllModals } =
  modalSlice.actions;
export default modalSlice;
