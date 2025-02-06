import React from "react";
import { useNavigate } from "react-router-dom";
export default function PostCard({ id, title, description }) {
  const navigate=useNavigate();
  const handleClick=async ()=>{
   navigate(`/post-page/${id}`);

  }
  return (
    <div className="pb-4 m-5 bg-gray-800 w-[96%] rounded-lg  cursor-pointer">
      <div className="p-4 text-xl font-semibold text-white">
        <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
      </div>
      <div className="px-4 pb-3 text-gray-300">{description}</div>
       <div className="flex justify-end px-4"> 
        <button
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300"
          onClick={handleClick}
        >
          Read More
        </button>
      </div>
    </div>
  );
}
