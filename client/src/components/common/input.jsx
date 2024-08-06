import React, { useEffect, useRef, useState } from "react";

export const InputPrimary = ({
  label,
  onChange,
  name,
  type,
  labelType,
  error,
  value,
  ...props
}) => {
  const [passHidded, setPassHidded] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (passHidded && type === "password") {
      inputRef.current.type = "password";
    } else {
      inputRef.current.type = "text";
    }
  }, [!!passHidded ? passHidded : null]);

  value ??= "Please send input value";

  return (
    <>
      <div className="h-fit relative flex items-center">
        <input
          type={type ?? "text"}
          className="w-full pt-[6px] pb-[1px] peer px-4  bg-[#000000] border border-[#c7c7c7]  border-opacity-60 text-sm "
          onChange={onChange}
          name={name ?? ""}
          ref={inputRef}
          {...props}
          // value={value}
        />

        {type === "password" &&
          (passHidded ? (
            <span
              className="cursor-pointer text-md absolute right-3 my-auto"
              onClick={() => setPassHidded(false)}
            >
              show
            </span>
          ) : (
            <span
              className="cursor-pointer text-md absolute right-3 self-center"
              onClick={() => setPassHidded(true)}
            >
              hide
            </span>
          ))}
        <label
          htmlFor="e-u-p"
          className={`absolute text-xs ml-3 peer-focus:mt-[-30px] ${
            labelType && "mt-[-30px]"
          } bg-[#000] transition-all`}
        >
          {label}
        </label>
      </div>
      {error && <h3 className="text-[12px] ml-3 text-red">{error}</h3>}
    </>
  );
};
