import { twMerge } from "tailwind-merge";

const StorieAvatar = ({ src, withRing = true, className, width = "" }) => {
  return (
    <div
      style={{ width }}
      className={twMerge(
        `cursor-pointer rounded-full flex items-center justify-center ${
          withRing && " bg-gradient-to-b from-gradient-start  to-gradient-mid "
        } `
      )}
    >
      <div
        className={twMerge(
          `scale-95 aspect-square rounded-full border-[black] border-4 overflow-hidden ${className}`
        )}
      >
        <img src={src} className="size-[100%] object-cover" />
      </div>
    </div>
  );
};

export default StorieAvatar;
