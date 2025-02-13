// src/components/input.jsx

import React from "react";

export const Input = ({ value, onChange, placeholder, type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-4 py-2 rounded-lg w-full ${className}`}
      {...props}
    />
  );
};
