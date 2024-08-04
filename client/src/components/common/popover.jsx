import React from "react";
import Modal from "react-modal";
const Popover = ({ children }) => {
  return (
    <Modal
      overlayClassName="modal-overlay bg-black/40 flex items-center justify-center max-sm:items-end"
    //   className="modal w-full sm:w-[350px] h-[80vh] sm:h-[350px] bg-[#3c3c3c] rounded-t-md sm:rounded-md"
      isOpen={showModal}
      onRequestClose={closeModal}
    >
      {children}
    </Modal>
  );
};

export default Popover;
