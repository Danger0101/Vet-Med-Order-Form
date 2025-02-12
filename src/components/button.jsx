// src/components/button.jsx

import React from "react";

export const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
