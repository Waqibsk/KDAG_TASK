import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostCard({ id, title, description, createdAt }) {
  
  
  const navigate = useNavigate();
  
  //redirects to individual post page
  const handleClick = async () => {
    navigate(`/post-page/${id}`);
  };

  //for converting the date to readable format 
  const dateConverter = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };


  //deletes a post 
  const handleDelete = async () => {
    const response = await axios.post(
      `http://localhost:8000/post/${id}/delete`
    );
    if (response.data.message === "ok") {
      navigate("/");
    }
  };
  return (
    <div>
      <div
        className="pb-4 m-5 bg-[#212020] w-[22.5rem] h-[16rem] max-[1124px]:w-[25rem] max-[880px]:w-[22rem] max-[768px]:w-[18rem] max-[650px]:w-[21rem] rounded-lg  cursor-pointer "
        onClick={handleClick}
      >
        <div className="p-4 text-2xl font-semibold text-white  ">
          <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
        </div>
        <div className="px-4 pb-3   h-[50%]">{description}</div>
        <div className="flex justify-between px-4">
          <div className=" text-white  py-2  ">
            Created on: {dateConverter(createdAt)}
          </div>
          <div
            className=" text-black bg-gray-300 rounded-lg px-4 py-2 "
            onClick={handleDelete}
          >
            delete
          </div>
        </div>
      </div>
    </div>
  );
}
