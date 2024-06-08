import React from "react";

export default function Card({ children, className, id }) {
  return (
    <div
      id={id}
      className={`bg-white rounded-lg p-8 shadow-xl w-full ${className || ""}`}
    >
      {children}
    </div>
  );
}
