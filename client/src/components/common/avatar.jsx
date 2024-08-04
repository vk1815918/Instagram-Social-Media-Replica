import { twMerge } from "tailwind-merge";

const Avatar = ({ src, className }) => {
  return (
    <div
      className={twMerge(
        `cursor-pointer overflow-hidden w-full aspect-square rounded-full bg-[gray] text-xl ${className}`
      )}
    >
      <img src={src} className="size-full object-cover" alt="Profile avatar" />
    </div>
  );
};

export default Avatar;
