import { MdOutlineExplore, MdSlowMotionVideo } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Avatar from "./avatar";
import SkeletonLoader from "../ui/skeleton";
import useAuth from "@/hooks/use-auth";
import { showModal } from "../../store/slices/modalSlice";

const MobileBottomNav = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user, isLoading } = useAuth();

  const openModal = (modalType: string) => {
    dispatch(showModal({ modalName: modalType }));
  };

  return (
    <footer className="sm:hidden fixed bottom-0 left-0 right-0 w-full bg-black py-2 px-4 z-[100]">
      <nav className="flex justify-between items-center w-full">
        <ul className="flex flex-row items-center justify-between w-full gap-6">
          <li>
            <NavLink
              to="/"
              className="transition p-1.5 rounded-md hover:bg-[#8080804d]"
            >
              <GoHomeFill className="text-[26px]" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore/"
              className="transition p-1.5 rounded-md hover:bg-[#8080804d]"
            >
              <MdOutlineExplore className="text-[26px]" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reels/"
              state={{ prevPagePath: pathname }}
              className="transition p-1.5 rounded-md hover:bg-[#8080804d]"
            >
              <MdSlowMotionVideo className="text-[26px]" />
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => openModal("createPost")}
              className="transition p-1.5 rounded-md hover:bg-[#8080804d] flex items-center"
            >
              <TbSquareRoundedPlus className="text-[26px]" />
            </button>
          </li>
          <li>
            {isLoading ? (
              <SkeletonLoader width="25px" height="25px" variant="circle" />
            ) : (
              user && (
                <NavLink
                  to={`/${user.username}/`}
                  className="transition p-1.5 rounded-md hover:bg-[#8080804d]"
                  onContextMenu={() => openModal("logout")}
                >
                  <Avatar src={user.profilePicture} className="w-[23px]" />
                </NavLink>
              )
            )}
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default MobileBottomNav;
