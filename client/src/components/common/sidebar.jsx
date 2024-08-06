import { MdOutlineExplore, MdSlowMotionVideo } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaRegHeart, FaInstagram } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RiThreadsLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import Avatar from "./avatar";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/slices/modalSlice";
import useAuth from "@/hooks/use-auth";
import SkeletonLoader from "../ui/skeleton";
import { TbSquareRoundedPlus } from "react-icons/tb";
import instagramLogo from "@/assets/logo/i-logo-2.jpg";

const Sidebar = () => {
  const { isLoading, user } = useAuth();

  const notifications = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const handleShowModal = (modalName) => {
    dispatch(showModal({ modalName }));
  };

  return (
    <>
      <div className="sidebar max-sm:hidden flex h-screen fixed left-0 bottom-0 z-50 sm:w-fit lg:w-[245px] px-2 lg:px-3 py-5 pb-6 bg-black ">
        <div className="w-full flex flex-col justify-between">
          <div className="w-full space-y-4">
            {/* Header */}
            <Link to={"/"} className="px-2">
              <div className="text-[30px] ">
                <img
                  src={instagramLogo}
                  className="max-lg:hidden max-w-[115px]"
                />
              </div>

              <span className="lg:hidden max-sm:hidden">
                <FaInstagram className="text-white text-xl" />
              </span>
            </Link>

            {/* Nav links */}
            <ul className="w-full flex flex-col gap-2">
              <NavLink
                to="/"
                className="sidebar-link transition hover:bg-[#8080804d] active:bg-[#8080804d] rounded-md w-full px-2 py-2"
              >
                <li className="cursor-pointer">
                  <ul className={`gap-2 items-center flex transition-all`}>
                    <li>
                      <GoHomeFill className="text-xl" />
                    </li>
                    <li className="max-lg:hidden text-md">Home</li>
                  </ul>
                </li>
              </NavLink>

              <li
                className="cursor-pointer transition hover:bg-[#8080804d] rounded-md w-full p-2"
                onClick={() => handleShowModal("search")}
              >
                <ul className={` gap-2 items-center flex transition-all `}>
                  <li>
                    <IoSearchOutline className="text-xl" />
                  </li>
                  <li className="max-lg:hidden text-md">Search</li>
                </ul>
              </li>

              <NavLink
                to="/explore/"
                className="sidebar-link transition hover:bg-[#8080804d] active:bg-[#8080804d] rounded-md w-full px-2 py-2"
              >
                <li className="cursor-pointer">
                  <ul className={` gap-2 items-center flex transition-all `}>
                    <li>
                      <MdOutlineExplore className="text-xl" />
                    </li>
                    <li className="max-lg:hidden text-md">Explore</li>
                  </ul>
                </li>
              </NavLink>

              <NavLink
                to="/reels/"
                className="sidebar-link transition hover:bg-[#8080804d] rounded-md w-full px-2 py-2"
              >
                <li className="cursor-pointer">
                  <ul className={` gap-2 items-center flex transition-all `}>
                    <li>
                      <MdSlowMotionVideo className="text-xl" />
                    </li>
                    <li className="max-lg:hidden text-md">Reels</li>
                  </ul>
                </li>
              </NavLink>

              <li className="sidebar-link cursor-pointer relative transition hover:bg-[#8080804d] rounded-md w-full px-2 py-2">
                <ul className={` gap-2 items-center flex transition-all`}>
                  <li className="relative">
                    <span className="h-[20px] aspect-square rounded-full flex items-center justify-center text-sm text-white bg-red absolute right-[-10px] top-[-10px]">
                      3
                    </span>
                    <BiMessageSquareAdd className="text-xl" />
                  </li>
                  <li className="max-lg:hidden text-md">Messages</li>
                </ul>
              </li>

              <NavLink
                to={"/notifications/"}
                className="sidebar-link transition hover:bg-[#8080804d] rounded-md w-full px-2 py-2"
              >
                <ul className={`gap-2 items-center flex transition-all`}>
                  <li className="relative">
                    {
                      <span className="h-[20px] aspect-square rounded-full flex items-center justify-center text-sm text-white bg-red absolute right-[-10px] top-[-10px]">
                        {notifications.unread && notifications.unread}
                      </span>
                    }
                    <FaRegHeart className="text-xl" />
                  </li>
                  <li className="max-lg:hidden text-md">Notifications</li>
                </ul>
              </NavLink>

              <li className="sidebar-link cursor-pointer transition hover:bg-[#8080804d] rounded-md w-full px-2 py-2">
                <ul
                  className={` gap-2 items-center flex transition-all`}
                  onClick={() => handleShowModal("createPost")}
                >
                  <li>
                    <TbSquareRoundedPlus className="text-xl" />
                  </li>
                  <li className="max-lg:hidden text-md">Create</li>
                </ul>
              </li>

              {/* Profile Navigator 👇🏼 */}
              {isLoading ? (
                <div className="px-2 py-2 flex items-center gap-2">
                  <SkeletonLoader
                    width={"25px"}
                    height={"25px"}
                    variant="circle"
                  />
                  <div className="max-lg:hidden text-md">Profile</div>
                </div>
              ) : (
                user && (
                  <NavLink
                    to={`/${user.username}/`}
                    className="sidebar-link transition hover:bg-[#8080804d] rounded-md w-full px-2 py-2"
                  >
                    <li className="cursor-pointer ">
                      <ul className="flex items-center gap-2">
                        <Avatar
                          src={user.profilePicture}
                          className={"w-[25px] max-sm:w-[28px]"}
                        />
                        <li className="max-lg:hidden text-md">Profile</li>
                      </ul>
                    </li>
                  </NavLink>
                )
              )}
            </ul>
          </div>

          {/* Actions */}
          <ul className="flex flex-col gap-3">
            <li className="cursor-pointer transition hover:bg-[#8080804d] rounded-md w-full px-2 py-1.5">
              <ul className="flex items-center gap-2">
                <li>
                  <RiThreadsLine className="text-xl" />
                </li>
                <li className="max-lg:hidden">Threads</li>
              </ul>
            </li>

            <li className="cursor-pointer transition hover:bg-[#8080804d] rounded-md w-full px-2 py-1.5">
              <ul
                className="flex items-center gap-2"
                onClick={() => handleShowModal("logout")}
              >
                <li>
                  <RxHamburgerMenu className="text-xl" />
                </li>
                <li className="max-lg:hidden">More</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
