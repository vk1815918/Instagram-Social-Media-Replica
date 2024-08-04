import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { handleHideModal } from "@/handler/modal-handlers";
import { useSearchParams } from "react-router-dom";
import UsersContainer from "./_users-container";

const FollowingModal = () => {
  const isOpen = useSelector((state) => state.modal.following);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("followings_req_username") || null;

  if (!username) {
    handleHideModal("following");
    return;
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const closeModal = () => {
    handleHideModal("following");
    setSearchParams((prev) => {
      return prev.delete("followings_req_username");
    });
  };

  return (
    <Modal
      overlayClassName="modal-overlay bg-black/40 flex items-center justify-center max-sm:items-end"
      className="modal w-full sm:w-[350px] h-[80vh] sm:h-[350px] bg-[#3c3c3c] rounded-t-md sm:rounded-md"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="flex flex-col w-full h-full pl-4 pt-2">
        <header className="flex justify-between items-center w-full pr-4 py-2 ">
          <span />
          <h3 className="text-md">Following</h3>
          <span
            className="cursor-pointer hover:opacity-75 transition"
            onClick={() => closeModal()}
          >
            <AiOutlineClose />
          </span>
        </header>

        <div className="pb-2 px-3 w-full flex items-center gap-2">
          <span className="pr-1">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="flex-1 w-full p-1 px-2 rounded-lg bg-[gray]/50 text-md"
            onChange={handleSearchInputChange}
          />
        </div>

        {/* Get users and show users */}
        <UsersContainer username={username} searchQuery={searchQuery} />
      </div>
    </Modal>
  );
};

export default FollowingModal;
