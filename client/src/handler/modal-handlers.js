import store from "@/store";
import { hideModal, showModal } from "@/store/slices/modalSlice";

export const handleShowModal = (modalName) => {
  store.dispatch(showModal({ modalName }));
};

export const handleHideModal = (modalName) => {
  store.dispatch(hideModal({ modalName }));
};

//
export const handleOpenFollowingModal = (username) => {
  const params = new URLSearchParams();
  params.append("followings_req_username", username);
  store.dispatch(showModal({ modalName: "following" }));
  window.history.pushState({}, "", `?${params.toString()}`);
};
