import { twMerge } from "tailwind-merge";

const StorieAvatar = ({ src, withRing = true }) => {
  return (
    <div
      className={twMerge(
        `cursor-pointer rounded-full flex items-center justify-center ${
          withRing && " bg-gradient-to-b from-gradient-start  to-gradient-mid "
        }`
      )}
    >
      <div className="size-[100%] aspect-square rounded-full border-[black] border-4 scale-95 overflow-hidden">
        <img src={src} className="size-[100%] object-cover" />
      </div>
    </div>
  );
};

export default StorieAvatar;
