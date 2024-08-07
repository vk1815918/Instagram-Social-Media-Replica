import { twMerge } from "tailwind-merge";

const SkeletonLoader = ({
  width,
  height,
  borderRadius = undefined,
  animationDirection = "left-right",
  colorScheme = "dark",
  variant = "rectangle",
  speed = "1.5s",
  className = "",
}) => {
  const directionClass = `animation-${animationDirection}`;
  const colorClass = `color-scheme-${colorScheme}`;
  const variantClass = `variant-${variant}`;

  if (variant === "circle") {
    height = undefined;
    borderRadius = "50%";
  }

  return (
    <div
      className={twMerge(
        `skeleton-loader ${directionClass} ${colorClass} ${variantClass} ${className}`
      )}
      style={{ width, height, borderRadius, animationDuration: speed }}
    ></div>
  );
};

export default SkeletonLoader;
