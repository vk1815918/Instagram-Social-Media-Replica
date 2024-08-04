import StorieAvatar from "@/components/common/storie-avatar";
import useAuth from "@/hooks/use-auth";
import { textSlicer } from "@/utils/text";
import { BiPlus } from "react-icons/bi";
const Stories = () => {
  const { user } = useAuth();
  return (
    <div className="px-1 no-scrollbar max-w-[100%] flex  gap-3 sm:gap-5 overflow-x-scroll ">
      <ul className="text-center cursor-pointer">
        <li className="relative w-[60px] sm:w-[70px]">
          <StorieAvatar withRing={false} src={user?.profilePicture} />
          <span className="absolute bottom-0 -right-[2px] bg-blue text-white size-[20px] rounded-full cursor-pointer grid place-content-center">
            <BiPlus />
          </span>
        </li>

        <li className="max-w-[100%] text-xs overflow-hidden">Your story</li>
      </ul>

      <ul className="text-center cursor-pointer">
        <li className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-1.jpg" />
        </li>
        <li className="max-w-[100%] text-xs overflow-hidden">Visca.barca</li>
      </ul>
      <ul className="text-center cursor-pointer">
        <li className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-2.jpg" />
        </li>
        <li className="max-w-[100%] text-xs overflow-hidden">Szobozlai</li>
      </ul>
      <ul className="text-center cursor-pointer">
        <li className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-3.jpg" />
        </li>
        <li className="max-w-[100%] text-xs overflow-hidden ">This.anfield</li>
      </ul>
      <ul className="text-center cursor-pointer">
        <li className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-4.jpg" />
        </li>
        <li className="max-w-[100%] text-xs overflow-hidden">Animation</li>
      </ul>
      <ul className="text-center cursor-pointer">
        <li className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-5.jpg" />
        </li>
        <li className="max-w-[100%] text-xs overflow-hidden">Alison1</li>
      </ul>
      <ul className="text-center cursor-pointe">
        <li className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-6.jpg" />
        </li>
        <li className="max-w-[100%] text-xs overflow-hidden ">SolaYnwa</li>
      </ul>
      <ul className="text-center cursor-pointer">
        <li className="w-[60px] sm:size-[70px]">
          <StorieAvatar src="/assets/images/acc-7.jpg" />
        </li>
        <li className="max-w-[100%] text-xs overflow-hidden">L.legends</li>
      </ul>
      <ul className="text-center cursor-pointer">
        <li className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-8.jpg" />
        </li>
        <li className="max-w-[100%] text-xs overflow-hidden">
          {textSlicer("Solomongetent", 10)}
        </li>
      </ul>
      <ul className="text-center cursor-pointer">
        <li className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-1.jpg" />
        </li>
        <li className="max-w-[100%] text-xs overflow-hidden">
          {textSlicer("Solomongetent", 10)}
        </li>
      </ul>
      <ul className="text-center cursor-pointer">
        <li className="w-[60px] sm:w-[70px]">
          <StorieAvatar src="/assets/images/acc-2.jpg" />
        </li>
        <li className="max-w-[100%] text-xs overflow-hidden">
          {textSlicer("Solomongetent", 10)}
        </li>
      </ul>
    </div>
  );
};

export default Stories;
