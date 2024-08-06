import { FC } from "react";
import { twMerge } from "tailwind-merge";

const ErrorMessage = ({ error, className }) => {
  if (!error) return;
  return (
    <span className={twMerge(`text-red/80 text-sm ${className}`)}>
      {error}
    </span>
  );
};

export default ErrorMessage;
