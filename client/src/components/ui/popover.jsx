import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const CustomPopover = ({
  triggerContent,
  triggerClassName,
  popoverClassName,
  position = "top-right",
  children,
  triggerIsOpen,
}) => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  const toggleVisibility = () => setVisible((prev) => !prev);

  useEffect(() => {
    setVisible(!!triggerIsOpen);
  }, [triggerIsOpen]);

  useEffect(() => {
    const handleClickAway = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", visible);
    return () => document.body.classList.remove("overflow-hidden");
  }, [visible]);

  const positionStyles = {
    "top-left": "bottom-full mb-2 left-0",
    "top-center": "bottom-full mb-2 left-1/2 -translate-x-1/2",
    "top-right": "bottom-full mb-2 right-0",
    "right-top": "left-full ml-2 top-0",
    "right-center": "left-full ml-2 top-1/2 -translate-y-1/2",
    "right-bottom": "left-full ml-2 bottom-0",
    "bottom-left": "top-full mt-2 left-0",
    "bottom-center": "top-full mt-2 left-1/2 -translate-x-1/2",
    "bottom-right": "top-full mt-2 right-0",
    "left-top": "right-full mr-2 top-0",
    "left-center": "right-full mr-2 top-1/2 -translate-y-1/2",
    "left-bottom": "right-full mr-2 bottom-0",
  };

  return (
    <div ref={containerRef} className="relative" style={{ zIndex: 1050 }}>
      <button
        type="button"
        className={twMerge(triggerClassName)}
        onClick={toggleVisibility}
      >
        {triggerContent ?? ""}
      </button>

      {visible && (
        <div
          className={twMerge(
            `absolute w-48 bg-black text-white rounded shadow-lg ${positionStyles[position]} ${popoverClassName}`
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CustomPopover;
