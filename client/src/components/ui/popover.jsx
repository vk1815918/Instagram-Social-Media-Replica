import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const Popover = ({
  triggerContent,
  triggerClassName,
  popoverClassName,
  position = "top-right",
  children,
  triggerIsOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    //none / close
    if (triggerIsOpen) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }, [triggerIsOpen]);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const positionClasses = {
    "top-left": "bottom-full mb-2 left-0",
    "top-center": "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    "top-right": "bottom-full mb-2 right-0",
    "right-top": "left-full ml-2 top-0",
    "right-center": "left-full ml-2 top-1/2 transform -translate-y-1/2",
    "right-bottom": "left-full ml-2 bottom-0",
    "bottom-left": "top-full mt-2 left-0",
    "bottom-center": "top-full mt-2 left-1/2 transform -translate-x-1/2",
    "bottom-right": "top-full mt-2 right-0",
    "left-top": "right-full mr-2 top-0",
    "left-center": "right-full mr-2 top-1/2 transform -translate-y-1/2",
    "left-bottom": "right-full mr-2 bottom-0",
  };

  return (
    <div className="relative " ref={popoverRef} style={{ zIndex: 1050 }}>
      <button
        onClick={togglePopover}
        className={twMerge(`${triggerClassName}`)}
      >
        {triggerContent || ""}
      </button>
      {isOpen && (
        <div
          className={twMerge(
            `absolute w-48 bg-black text-white rounded shadow-lg ${positionClasses[position]} ${popoverClassName}`
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
