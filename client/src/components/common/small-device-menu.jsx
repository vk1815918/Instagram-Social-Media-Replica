import { MdOutlineExplore, MdSlowMotionVideo } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { BiMessageSquareAdd } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Avatar from "./avatar";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/slices/modalSlice";
import { SpinnerLoader } from "./loader";
import useAuth from "@/hooks/use-auth";

const SmallDeviceMenu = () => {
  const { isLoading, user } = useAuth();

  const dispatch = useDispatch();

  const handleShowModal = (modalName) => {
    dispatch(showModal({ modalName }));
  };

  return (
    <>
      <div className="sm:hidden z-[100] py-2 px-6 w-full fixed bottom-0 left-0 right-0 bg-black">
        <div className="flex justify-center w-full">
          {/* Nav links */}
          <ul className="max-sm:flex-row flex flex-col gap-6 max-sm:justify-between max-sm:w-full">
            {/* <NavLinks /> */}
            <NavLink to="/">
              <li className="cursor-pointer">
                <ul
                  className={` gap-2 items-center hover:font-bold flex transition-all`}
                >
                  <li>
                    <GoHomeFill className="text-[26px]" />
                  </li>
                </ul>
              </li>
            </NavLink>

            <NavLink to="/explore/">
              <li className="cursor-pointer">
                <ul
                  className={` gap-2 items-center hover:font-bold flex transition-all `}
                >
                  <li>
                    <MdOutlineExplore className="text-[26px]" />
                  </li>
                </ul>
              </li>
            </NavLink>

            <NavLink to="/reels/">
              <li className="cursor-pointer">
                <ul
                  className={` gap-2 items-center hover:font-bold flex transition-a[28px]`}
                >
                  <li>
                    <MdSlowMotionVideo className="text-[26px]" />
                  </li>
                </ul>
              </li>
            </NavLink>

            <li className="cursor-pointer">
              <ul
                className={` gap-2 items-center hover:font-bold flex transition-all`}
                onClick={() => handleShowModal("createPost")}
              >
                <li>
                  <CiSquarePlus className="text-[26px]" />
                </li>
              </ul>
            </li>

            {/* Profile Navigator 👇🏼 */}
            {isLoading ? (
              <div className="size-[23px] bg-[gray] rounded-full"></div>
            ) : (
              user && (
                <NavLink to={`/${user?.username}/`} onContextMenu={() => handleShowModal('logout')}>
                  <li className="cursor-pointer ">
                    <ul className="flex items-center gap-2">
                      <li className="w-[23px]">
                        <Avatar src={user?.profilePicture} />
                      </li>
                      <li className="max-lg:hidden">Profile</li>
                    </ul>
                  </li>
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
