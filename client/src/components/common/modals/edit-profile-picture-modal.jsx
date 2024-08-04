import Modal from "react-modal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "@/store/slices/modalSlice";
import {
  useRemoveProfilePicMutation,
  useUpdateProfilePicMutation,
} from "@/api/services/profileServices";
import useAuth from "@/hooks/use-auth";

const EditProfilePictureModal = () => {
  const isOpen = useSelector((state) => state.modal.editProfilePicture);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [updateProfilePic] = useUpdateProfilePicMutation();
  const [removeProfilePic] = useRemoveProfilePicMutation();

  const closeModal = () => {
    dispatch(hideModal({ modalName: "editProfilePicture" }));
  };

  const handleUploadProfilePic = async (e) => {
    const _fd = new FormData();
    _fd.append("avatar", e.target.files[0]);
    try {
      const { message } = await updateProfilePic(_fd).unwrap();
      toast.dark(message);
      closeModal();
    } catch (error) {
      toast.dark(error.data.message);
    }
  };
  const handleRemoveProfilePic = async () => {
    try {
      const res = await removeProfilePic().unwrap();
      toast.dark(res.message);
    } catch (error) {
      console.log(error);
      toast.dark(error.data.message);
    }
  };
  return (
    <Modal
      overlayClassName="modal-overlay bg-black/40 flex items-center justify-center max-sm:items-end"
      className="modal sm:rounded-t-md sm:rounded-md w-full sm:w-[380px] h-fit bg-[#2d2d2d]"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="flex flex-col w-full divide-y-2">
        <header className="w-full py-5 flex justify-center border-solid border-white/10 border-t-0  border-l-0  border-r-0  border-b-1">
          Change Profile Picture
        </header>

        <ul className="flex flex-col">
          <li className="w-full py-2 cursor-pointer flex justify-center hover:opacity-75 transition border-solid border-white/10 border-t-0  border-l-0  border-r-0  border-b-1">
            <label
              htmlFor="profile-picture-selector"
              className="text-md text-[#3d86eb] cursor-pointer"
            >
              Change Profle
            </label>
            <input
              type="file"
              className="hidden"
              id="profile-picture-selector"
              onChange={handleUploadProfilePic}
              accept="image/*"
            />
          </li>
          {
            <li
              className="w-full py-2 cursor-pointer flex justify-center text-md text-red hover:opacity-75 transition border-solid border-white/10 border-t-0  border-l-0  border-r-0  border-b-1"
              onClick={handleRemoveProfilePic}
            >
              Remove Current Profile
            </li>
          }

          <li className="w-full py-2 cursor-pointer flex justify-center text-md text-white hover:opacity-75 transition ">
            Cancel
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default EditProfilePictureModal;
