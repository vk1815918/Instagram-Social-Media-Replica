import { MdOutlineExplore, MdSlowMotionVideo } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
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
import { SpinnerLoader } from "./loader";

const Sidebar = () => {
  const { isLoading, user } = useAuth();

  const notifications = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const handleShowModal = (modalName) => {
    dispatch(showModal({ modalName }));
  };

  return (
    <>
      <div className="max-sm:hidden flex h-screen fixed left-0 bottom-0 z-50 sm:w-fit lg:w-60 sm:px-4 lg:px-5 py-8 bg-black ">
        <div className="flex flex-col justify-between">
          {/* Header */}
          <Link to={"/"}>
            <div className="text-[30px]">
              <img
                src="/assets/i-logo-2.jpg"
                className="max-lg:hidden max-w-[115px]"
              />
            </div>

            <span className="lg:hidden max-sm:hidden">
              <FaInstagram className="text-white text-xl" />
            </span>
          </Link>

          {/* Nav links */}
          <ul className="flex flex-col gap-7">
            {/* <NavLinks /> */}
            <NavLink to="/">
              <li className="cursor-pointer">
                <ul
                  className={`gap-2 items-center hover:font-bold flex transition-all`}
                >
                  <li>
                    <GoHomeFill className="text-xl" />
                  </li>
                  <li className="max-lg:hidden">Home</li>
                </ul>
              </li>
            </NavLink>

            <li
              className="cursor-pointer"
              onClick={() => handleShowModal("search")}
            >
              <ul
                className={` gap-2 items-center hover:font-bold flex transition-all `}
              >
                <li>
                  <IoSearchOutline className="text-xl" />
                </li>
                <li className="max-lg:hidden">Search</li>
              </ul>
            </li>

            <NavLink to="/explore/">
              <li className="cursor-pointer">
                <ul
                  className={` gap-2 items-center hover:font-bold flex transition-all `}
                >
                  <li>
                    <MdOutlineExplore className="text-xl" />
                  </li>
                  <li className="max-lg:hidden">Explore</li>
                </ul>
              </li>
            </NavLink>

            <NavLink to="/reels/">
              <li className="cursor-pointer">
                <ul
                  className={` gap-2 items-center hover:font-bold flex transition-all `}
                >
                  <li>
                    <MdSlowMotionVideo className="text-xl" />
                  </li>
                  <li className="max-lg:hidden">Reels</li>
                </ul>
              </li>
            </NavLink>

            <li className="cursor-pointer relative">
              <ul
                className={` gap-2 items-center hover:font-bold flex transition-all`}
              >
                <li className="relative">
                  <span className="h-[20px] aspect-square rounded-full flex items-center justify-center text-sm text-white bg-red absolute right-[-10px] top-[-10px]">
                    3
                  </span>
                  <BiMessageSquareAdd className="text-xl" />
                </li>
                <li className="max-lg:hidden">Messages</li>
              </ul>
            </li>

            <NavLink
              to={"/notifications/"}
              className=" cursor-pointer  max-sm:hidden"
            >
              <ul
                className={`gap-2 items-center hover:font-bold flex transition-all`}
              >
                <li className="relative">
                  {
                    <span className="h-[20px] aspect-square rounded-full flex items-center justify-center text-sm text-white bg-red absolute right-[-10px] top-[-10px]">
                      {notifications.unread && notifications.unread}
                    </span>
                  }
                  <FaRegHeart className="text-xl" />
                </li>
                <li className="max-lg:hidden">Notifications</li>
              </ul>
            </NavLink>

            <li className="cursor-pointer">
              <ul
                className={` gap-2 items-center hover:font-bold flex transition-all`}
                onClick={() => handleShowModal("createPost")}
              >
                <li>
                  <CiSquarePlus className="text-xl" />
                </li>
                <li className="max-lg:hidden">Create</li>
              </ul>
            </li>

            {/* Profile Navigator 👇🏼 */}
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="size-[25px] bg-[gray] rounded-full"></div>
                <div className="max-lg:hidden">Profile</div>
              </div>
            ) : (
              user && (
                <NavLink to={`/${user.username}/`}>
                  <li className="cursor-pointer ">
                    <ul className="flex items-center gap-2">
                      <li className="w-[25px] max-sm:w-[28px]">
                        <Avatar src={user.profilePicture} />
                      </li>
                      <li className="max-lg:hidden">Profile</li>
                    </ul>
                  </li>
                </NavLink>
              )
            )}
          </ul>

          {/* Actions */}
          <ul className="flex flex-col gap-4">
            <li className="cursor-pointer">
              <ul className="flex items-center gap-2">
                <li>
                  <RiThreadsLine className="text-xl" />
                </li>
                <li className="max-lg:hidden">Threads</li>
              </ul>
            </li>
            <li className="cursor-pointer">
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
