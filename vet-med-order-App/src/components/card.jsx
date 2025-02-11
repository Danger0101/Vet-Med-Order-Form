// src/components/card.jsx

import React from "react";

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`border rounded-lg shadow-lg p-4 bg-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
