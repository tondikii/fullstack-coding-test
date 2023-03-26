import React from "react";

export default function ButtonRounded({
  type = "",
  children = "",
  onClick = () => {},
  className = "",
}) {
  return (
    <button
      type={type}
      className={` ${className} w-full p-2 items-center text-xl rounded-3xl`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
