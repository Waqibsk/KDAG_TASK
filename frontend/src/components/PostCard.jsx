import React from "react";

export default function PostCard({ id, title, description }) {
  return (
    <div className="pb-4 m-5 bg-gray-800 w-[96%] rounded-lg  cursor-pointer">
      <div className="p-4 text-xl font-semibold text-white">
        <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
      </div>
      <div className="px-4 pb-3 text-gray-300">{description}</div>
    </div>
  );
}
