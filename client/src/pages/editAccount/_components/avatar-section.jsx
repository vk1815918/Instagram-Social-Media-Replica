import Avatar from "@/components/common/avatar";
import useAuth from "@/hooks/use-auth";
import { showModal } from "@/store/slices/modalSlice.js";
import { useDispatch, useSelector } from "react-redux";

const AvatarSection = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleShowModal = (modalName) => {
    dispatch(showModal({ modalName }));
  };

  return (
    <div className="w-full bg-[#424242] h-[70px] rounded-md flex items-center">
      <ul className="w-full flex justify-between px-4 items-center">
        <li className="flex items-center gap-2">
          <div className="w-[60px]">
            <Avatar src={user?.profilePicture} />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm leading-none">
              {user?.username}
            </h3>
            <h3 className="text-sm leading-none">{user?.fullName}</h3>
          </div>
        </li>

        <li>
          <button
            className="btn-primary text-sm px-3"
            onClick={() => handleShowModal("editProfilePicture")}
          >
            Change photo
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AvatarSection;
