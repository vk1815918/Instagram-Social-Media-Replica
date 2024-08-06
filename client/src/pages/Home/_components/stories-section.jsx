import StorieAvatar from "@/components/common/storie-avatar";
import SkeletonLoader from "@/components/ui/skeleton";
import useAuth from "@/hooks/use-auth";
import { textSlicer } from "@/utils/text";
import { BiPlus } from "react-icons/bi";
const Stories = () => {
  const { user, isLoading } = useAuth();
  return isLoading ? (
    <StoriesLoader />
  ) : (
    <div className="px-1 no-scrollbar max-w-[100%] flex  gap-3 sm:gap-5 overflow-x-scroll ">
      <div className="text-center cursor-pointer">
        <div className="relative w-[60px] sm:w-[70px]">
          <StorieAvatar withRing={false} src={user?.profilePicture} />
          <span className="absolute bottom-0 -right-[2px] bg-blue text-white size-[20px] rounded-full cursor-pointer grid place-content-center">
            <BiPlus />
          </span>
        </div>

        <div className="max-w-[100%] text-xs overflow-hidden">Your story</div>
      </div>

      <div className="text-center cursor-pointer">
        <div className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-1.jpg" />
        </div>
        <div className="max-w-[100%] text-xs overflow-hidden">Visca.barca</div>
      </div>
      <div className="text-center cursor-pointer">
        <div className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-2.jpg" />
        </div>
        <div className="max-w-[100%] text-xs overflow-hidden">Szobozlai</div>
      </div>
      <div className="text-center cursor-pointer">
        <div className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-3.jpg" />
        </div>
        <div className="max-w-[100%] text-xs overflow-hidden ">
          This.anfield
        </div>
      </div>
      <div className="text-center cursor-pointer">
        <div className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-4.jpg" />
        </div>
        <div className="max-w-[100%] text-xs overflow-hidden">Animation</div>
      </div>
      <div className="text-center cursor-pointer">
        <div className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-5.jpg" />
        </div>
        <div className="max-w-[100%] text-xs overflow-hidden">Alison1</div>
      </div>
      <div className="text-center cursor-pointe">
        <div className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-6.jpg" />
        </div>
        <div className="max-w-[100%] text-xs overflow-hidden ">SolaYnwa</div>
      </div>
      <div className="text-center cursor-pointer">
        <div className="w-[60px] sm:size-[70px]">
          <StorieAvatar src="/assets/images/acc-7.jpg" />
        </div>
        <div className="max-w-[100%] text-xs overflow-hidden">L.legends</div>
      </div>
      <div className="text-center cursor-pointer">
        <div className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-8.jpg" />
        </div>
        <div className="max-w-[100%] text-xs overflow-hidden">
          {textSlicer("Solomongetent", 10)}
        </div>
      </div>
      <div className="text-center cursor-pointer">
        <div className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-1.jpg" />
        </div>
        <div className="max-w-[100%] text-xs overflow-hidden">
          {textSlicer("Solomongetent", 10)}
        </div>
      </div>
      <div className="text-center cursor-pointer">
        <div className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-2.jpg" />
        </div>
        <div className="max-w-[100%] text-xs overflow-hidden">
          {textSlicer("Solomongetent", 10)}
        </div>
      </div>
    </div>
  );
};

export default Stories;

const StoriesLoader = () => (
  <div className="px-1 no-scrollbar max-w-[100%] flex  gap-2 overflow-x-scroll ">
    {[...Array(10)].map((_, idx) => (
      <div className="flex flex-col items-center cursor-pointer" key={idx}>
        <SkeletonLoader
          speed="3s"
          className={"w-[80px] sm:w-[90px] rounded-full"}
          width={"70px"}
          variant="circle"
        />
      </div>
    ))}
  </div>
);
