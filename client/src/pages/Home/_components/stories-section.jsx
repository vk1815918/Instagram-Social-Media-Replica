import StorieAvatar from "@/components/common/storie-avatar";
import SkeletonLoader from "@/components/ui/skeleton";
import useAuth from "@/hooks/use-auth";
import { BiPlus } from "react-icons/bi";
import storieOneImg from "@/assets/images/acc-1.jpg";
import storieTwoImg from "@/assets/images/acc-9.jpg";
import storieThreeImg from "@/assets/images/acc-3.jpg";
import storieFourImg from "@/assets/images/acc-12.jpg";
import storieFiveImg from "@/assets/images/acc-11.jpg";
import storieSixImg from "@/assets/images/acc-6.jpg";
import storieSevenImg from "@/assets/images/acc-7.jpg";
import storieEightImg from "@/assets/images/acc-8.jpg";

const stories = [
  {
    profilePicture: storieOneImg,
    username: "bertemios",
  },
  {
    profilePicture: storieTwoImg,
    username: "nebilnur",
  },
  {
    profilePicture: storieThreeImg,
    username: "adiss_12",
  },
  {
    profilePicture: storieFourImg,
    username: "virgilvandijk",
  },
  {
    profilePicture: storieFiveImg,
    username: "_paris.boy",
  },
  {
    profilePicture: storieSixImg,
    username: "ezedin.kamil",
  },
  {
    profilePicture: storieSevenImg,
    username: "eden_55",
  },
  {
    profilePicture: storieEightImg,
    username: "amanuel_304",
  },
];

const Stories = () => {
  const { user, isLoading } = useAuth();
  return isLoading ? (
    <StoriesLoader />
  ) : (
    <div className="px-2 max-w-[100%] flex gap-3 sm:gap-5 no-scrollbar  overflow-x-scroll ">
      <div className="text-center cursor-pointer">
        <div className="relative size-[80px]">
          <StorieAvatar
            withRing={false}
            width="80px"
            src={user?.profilePicture}
          />

          <span className="absolute bottom-0 -right-[2px] bg-blue text-white size-[20px] rounded-full cursor-pointer grid place-content-center">
            <BiPlus />
          </span>
        </div>

        <div className="max-w-[100%] text-xs overflow-hidden">Your story</div>
      </div>

      {stories.map((story, idx) => (
        <div className="text-center cursor-pointer">
          <StorieAvatar
            className={"w-[80px]"}
            src={story.profilePicture}
            withRing
          />
          <div className="max-w-[100%] text-xs overflow-hidden">
            {story.username}
          </div>
        </div>
      ))}
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
