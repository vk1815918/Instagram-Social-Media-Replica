import { useEffect, useLayoutEffect } from "react";
import Routes from "./routes/routes";
import { useLazyFetchCurrentProfileQuery } from "./api/services/profileServices.js";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchModal from "./components/common/modals/search/search-modal.jsx";
import CreatePostModal from "./components/common/modals/create-post/create-post-modal.jsx";
import SinglePostModal from "./components/common/modals/single-post/single-post-modal.jsx";
import LogoutModal from "./components/common/modals/logout-modal.jsx";
import EditProfilePictureModal from "./components/common/modals/edit-profile-picture-modal.jsx";
import { hideAllModals } from "./store/slices/modalSlice.js";
import { useLazyGetNotificationsQuery } from "./api/services/notificationService";
import useAuth from "./hooks/use-auth.jsx";
import FollowerModal from "./components/common/modals/follower/follower-modal";
import FollowingModal from "./components/common/modals/following/following-modal";

const App = () => {
  const [fetchCurentProfile] = useLazyFetchCurrentProfileQuery();
  const [getAllNotifications] = useLazyGetNotificationsQuery({
    pollingInterval: 60000,
  });
  const { isLoggedIn } = useAuth();

  Modal.setAppElement("#root");

  useLayoutEffect(() => {
    if (isLoggedIn) {
      fetchCurentProfile();
      return;
    }
  }, []);

  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <>
      <Routes />
      <ToastContainer
        style={{ color: "black" }}
        className="text-black"
        toastClassName="text-black"
        position="bottom-right"
      />
      <AllModalsWwrapper />
    </>
  );
};

export default App;

const AllModalsWwrapper = () => {
  const {
    search,
    singlePost,
    createPost,
    logout,
    editProfilePicture,
    followers,
    following,
  } = useSelector((state) => state.modal);
  const location = useLocation();
  const dispatch = useDispatch();

  //hide all modals when the page is navigated / changed
  useEffect(() => {
    dispatch(hideAllModals());
  }, [location.pathname]);

  return (
    <>
      {search && <SearchModal />}
      {singlePost && <SinglePostModal />}
      {createPost && <CreatePostModal />}
      {logout && <LogoutModal />}
      {editProfilePicture && <EditProfilePictureModal />}
      {editProfilePicture && <EditProfilePictureModal />}
      {followers && <FollowerModal />}
      {following && <FollowingModal />}
    </>
  );
};
