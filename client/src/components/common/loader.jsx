import React from "react";
import { twMerge } from "tailwind-merge";

export const SpinnerLoader = ({ className }) => {
  return <div className={twMerge(`loader size-[35px] ${className} `)}></div>;
};

export const FullLineLoader = () => {
  return (
    <div className="line-loader text-white cursor-pointer  bg-gradient-to-l from-gradient-start to-gradient-mid fixed top-0 left-0 right-0 w-full h-[2px] z-50"></div>
  );
};
