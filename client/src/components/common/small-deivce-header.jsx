import { showModal } from "@/store/slices/modalSlice";
import { BiSearch } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import instagramLogo from "@/assets/logo/i-logo-2.jpg";

const SmallDeviceHeader = () => {
  const unread = useSelector((state) => state.notification.unread);
  const dispatch = useDispatch();
  const handleOpenSearchModal = () => {
    dispatch(showModal({ modalName: "search" }));
  };
  return (
    <header className="z-[100] sm:hidden fixed top-0 left-0 right-0 w-full h-[60px] flex items-center px-3 bg-black border-b border-b-[#c3c3c3]">
      <div className="w-full flex justify-between items-center">
        <div>
          <Link to={"/"}>
            <img
              src={instagramLogo}
              className="max-w-[120px] cursor-pointer"
              alt=""
            />
          </Link>
        </div>

        <ul className="flex gap-4 items-center" onClick={handleOpenSearchModal}>
          <li>
            <span className="cursor-pointer">
              <BiSearch className="text-xl" />
            </span>
          </li>

          <NavLink to={"/notifications/"} className="relative">
            {!!unread && (
              <span className="absolute top-0 right-0 size-2 rounded-full bg-red" />
            )}
            <span className="cursor-pointer">
              <FaRegHeart className="text-xl" />
            </span>
          </NavLink>
        </ul>
      </div>
    </header>
  );
};

export default SmallDeviceHeader;
