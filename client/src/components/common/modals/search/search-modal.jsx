import { useState, useRef } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "@/store/slices/modalSlice";
import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { SpinnerLoader } from "../../loader";
import SearchResult from "./_search-result";
import { IoClose } from "react-icons/io5";
import { handleHideModal } from "@/handler/modal-handlers";

const SearchModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.search);
  const inputRef = useRef(null);
  const [isInputFocus, setIsInputFocus] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const closeModal = () => {
    dispatch(hideModal({ modalName: "search" }));
  };

  const handleClearSearchInput = () => {
    inputRef.current.value = "";
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <Modal
      overlayClassName="modal-overlay flex items-center justify-center max-sm:items-end"
      className="modal h-screen w-screen max-sm:h-[100vh] sm:rounded-xl sm:w-[350px] bg-[black] absolute top-0 left-0 bottom-0"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="w-full h-full flex flex-col p-5">
        {/* Header */}
        <header className="flex justify-between">
          <span
            className="cursor-pointer text-lg sm:hidden"
            onClick={() => handleHideModal("search")}
          >
            <IoClose />
          </span>
          <span className="text-xl font-bold">Search</span>
        </header>

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
              <span
                onClick={handleClearSearchInput}
                className={twMerge(
                  `cursor-pointer hidden ${isInputFocus && "block"}`
                )}
              >
                <AiOutlineClose className="text-xs" />
              </span>
            </div>
          </div>
        </div>

        {/* Main content wrapper*/}
        <SearchResult inputValue={inputValue} />
      </div>
    </Modal>
  );
};

export default SearchModal;
