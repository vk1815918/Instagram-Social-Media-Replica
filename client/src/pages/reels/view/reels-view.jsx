import { AiOutlineArrowLeft } from "react-icons/ai";
import ReelsContainer from "../_components/reels-containe";
import { CustomNavigator } from "@/handler/navigator";

const ReelsView = () => {
  return (
    <div className="w-full h-screen sm:h-[87vh] flex justify-center overflow-hidden">
      <div className="flex items-center gap-2 sm:hidden fixed top-4 left-4 z-50">
        <CustomNavigator className="bg-black/0 cursor-pointer" to={"/"}>
          <AiOutlineArrowLeft className="text-xl" />
        </CustomNavigator>

        <h2 className="text-lg font-bold">Reels</h2>
      </div>

      <ReelsContainer />
    </div>
  );
};

export default ReelsView;
