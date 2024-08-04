import Avatar from "@/components/common/avatar";
import React from "react";
import { TfiPlus } from "react-icons/tfi";

const SecondCol = () => {
  return (
    <li>
      <div className="w-full py-5 overflow-hidden flex gap-8">
        <div className="w-[75px]">
          <div className="w-full">
            <Avatar src="default-profile.jpeg" />
          </div>
          <span className="line-clamp-1 max-w-full text-sm">
            Somtime it will hard
          </span>
        </div>

        <div className="w-[75px]">
          <div className="w-full">
            <Avatar src="default-profile.jpeg" />
          </div>
          <span className="line-clamp-1 max-w-full text-sm">
            Here we go again
          </span>
        </div>

        <div className="w-[75px]">
          <div className="w-full">
            <Avatar src="default-profile.jpeg" />
          </div>
          <span className="line-clamp-1 max-w-full text-sm">
            Solomon getnet
          </span>
        </div>
        {/* Add new */}
        <div className="w-[80px] aspect-square rounded-full flex items-center justify-center cursor-pointer group">
          <span>
            <TfiPlus className="text-4xl opacity-60 transition-all group-hover:opacity-100" />
          </span>
        </div>
      </div>
    </li>
  );
};

export default SecondCol;
