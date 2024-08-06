import { MdOutlineExplore, MdSlowMotionVideo } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { NavLink, useLocation } from "react-router-dom";
import Avatar from "./avatar";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/slices/modalSlice";
import useAuth from "@/hooks/use-auth";
import { TbSquareRoundedPlus } from "react-icons/tb";
import SkeletonLoader from "../ui/skeleton";

const SmallDeviceMenu = () => {
  const { isLoading, user } = useAuth();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const handleShowModal = (modalName) => {
    dispatch(showModal({ modalName }));
  };

  return (
    <>
      <div className="sm:hidden z-[100] py-2 px-4 w-full fixed bottom-0 left-0 right-0 bg-black">
        <div className="w-full flex items-center">
          {/* Nav links */}
          <ul className="w-full flex flex-row items-center gap-6 justify-between  ">
            {/* <NavLinks /> */}
            <NavLink
              to="/"
              className="sidebar-link cursor-pointer transition hover:bg-[#8080804d] rounded-md p-1.5"
            >
              <GoHomeFill className="text-[26px]" />
            </NavLink>

            <NavLink
              to="/explore/"
              className="sidebar-link cursor-pointer transition hover:bg-[#8080804d] rounded-md p-1.5"
            >
              <MdOutlineExplore className="text-[26px]" />
            </NavLink>

            <NavLink
              to="/reels/"
              className="sidebar-link cursor-pointer transition hover:bg-[#8080804d] rounded-md p-1.5"
              state={{ prevPagePath: pathname }}
            >
              <MdSlowMotionVideo className="text-[26px]" />
            </NavLink>

            <li className="sidebar-link cursor-pointer transition hover:bg-[#8080804d] rounded-md p-1.5">
              <div
                className={` gap-2 items-center hover:font-bold flex transition-all`}
                onClick={() => handleShowModal("createPost")}
              >
                <TbSquareRoundedPlus className="text-[26px]" />
              </div>
            </li>

            {/* Profile Navigator 👇🏼 */}
            {isLoading ? (
              <SkeletonLoader width={"25px"} height={"25px"} variant="circle" />
            ) : (
              user && (
                <NavLink
                  className="auth-profile-navigtor cursor-pointer transition hover:bg-[#8080804d] rounded-md h-fit"
                  to={`/${user?.username}/`}
                  onContextMenu={() => handleShowModal("logout")}
                >
                  <Avatar src={user?.profilePicture} className={"w-[23px]"} />
                </NavLink>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SmallDeviceMenu;
