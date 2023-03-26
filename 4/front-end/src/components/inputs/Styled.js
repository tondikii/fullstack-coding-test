import React from "react";

export default function StyledInput({
  name = "",
  type = "text",
  className = "",
  placeholder = "",
  onChange = () => {},
  required = true,
  value = {},
}) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      className={`${className} w-full rounded-lg border-input px-2 py-1`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
