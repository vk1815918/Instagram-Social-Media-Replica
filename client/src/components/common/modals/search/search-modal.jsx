import { useState, useRef } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "@/store/slices/modalSlice";
import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import ProfileCard from "../../profile-card";
import { useLazySearchQuery } from "@/api/services/othersServices";
import { SpinnerLoader } from "../../loader";

const SearchModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.search);
  const inputRef = useRef(null);
  const [isInputFocus, setIsInputFocus] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [search, { data, isLoading, isFetching, isError }] =
    useLazySearchQuery();

  const closeModal = () => {
    dispatch(hideModal({ modalName: "search" }));
  };

  const handleClearSearchInput = () => {
    inputRef.current.value = "";
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    await search(value);
  };

  return (
    <Modal
      overlayClassName="modal-overlay flex items-center justify-center max-sm:items-end"
      className="modal h-screen w-screen max-sm:h-[60vh] rounded-xl sm:w-[350px] bg-[black] absolute top-0 left-0 bottom-0"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="w-full h-full flex flex-col p-5">
        {/* Header */}
        <header className="text-xl font-bold">Search</header>

        {/* Input Bar  */}
        <div className="mt-3 w-full ">
          <div className="relative w-full flex items-center bg-[gray]/50 rounded overflow-hidden ">
            <input
              type="text"
              className="w-full py-1 px-4 flex-1 bg-black/0 text-sm"
              placeholder="Search"
              ref={inputRef}
              onChange={handleInputChange}
              onInput={(e) =>
                e.target.value.length > 1 && setIsInputFocus(true)
              }
              onFocus={(e) =>
                e.target.value.length === 0 && setIsInputFocus(true)
              }
            />
            <div className="px-2">
              {isFetching ? (
                <SpinnerLoader className="w-4" />
              ) : (
                <span
                  onClick={handleClearSearchInput}
                  className={twMerge(
                    `cursor-pointer hidden ${isInputFocus && "block"}`
                  )}
                >
                  <AiOutlineClose className="text-xs" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main content wrapper*/}

        <div className="mt-10 w-full flex-1 px-2 overflow-y-scroll">
          {isError ? (
            <h3 className="text-center pt-10">Some error occuerd</h3>
          ) : inputValue.length === 0 ? (
            <div className="h-full w-full flex flex-col pt-5">
              <h3>Recent</h3>
              <div className="flex-1 flex items-center justify-center">
                No Recent Search
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <SpinnerLoader className="w-10" />
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full ">
              {data.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  No Result
                </div>
              ) : (
                data?.map((itm, index) => (
                  <ProfileCard
                    verified={itm.verified}
                    withVerified
                    username={itm.username}
                    withUsername
                    avatarUrl={itm.profilePicture}
                    key={index}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
