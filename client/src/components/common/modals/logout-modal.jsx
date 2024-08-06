import Modal from "react-modal";
import { useLogoutMutation } from "@/api/services/authServices.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "@/store/slices/modalSlice.js";
import { Link } from "react-router-dom";

const LogoutModal = () => {
  const [logoutUser] = useLogoutMutation();
  const isOpen = useSelector((state) => state.modal.logout);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      toast.dark(res.message);
      closeModal();
    } catch (error) {
      toast.dark(error.data.message);
      console.log(error);
    }
  };

  const closeModal = () => {
    dispatch(hideModal({ modalName: "logout" }));
  };

  return (
    <Modal
      overlayClassName="modal-overlay bg-black/40 flex items-center justify-center itemd-center"
      className="modal w-[60%] sm:w-[350px] sm:h-fit bg-[#3c3c3c] rounded-md"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="flex flex-col w-full divide-y-2">
        <header className="w-full py-5 flex justify-center border-solid border-white/10 border-t-0  border-l-0  border-r-0  border-b-1">
          More
        </header>

        <ul className="flex flex-col">
          <Link
            to="/accounts/edit"
            className="w-full py-2 cursor-pointer flex justify-center text-md text-[#3d86eb] hover:opacity-75 transition border-solid border-white/10 border-t-0  border-l-0  border-r-0  border-b-1"
          >
            Edit profile
          </Link>

          <li
            className="w-full py-2 cursor-pointer flex justify-center text-md text-red hover:opacity-75 transition border-solid border-white/10 border-t-0  border-l-0  border-r-0  border-b-1"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default LogoutModal;
