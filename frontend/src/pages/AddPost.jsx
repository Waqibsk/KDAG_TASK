import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      description,
      createdAt: Date.now(),
    };
    const response = await axios.post(
      "http://localhost:8000/post/create",
      postData
    );
    if (response.data.message === "ok") {
      navigate("/");
    } else {
      alert(response.data.message)
      navigate("/add");
    }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="flex justify-center items-center min-h-screen bg-[#0b0b0b]">
        <div className="flex-col w-full">
          <h2 className="flex justify-center text-4xl text-white font-bold">
            Add Post
          </h2>
          <div className="p-4 w-full  flex justify-center ">
            <input
              type="text"
              placeholder="Title"
              className="p-4 bg-white rounded-lg w-[40%] "
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="p-4 flex justify-center">
            <textarea
              type="text"
              placeholder="Description"
              className="p-4  bg-white  rounded-lg w-[40%] "
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="p-4 flex justify-center">
            <button
              className="bg-white text-black p-4 w-[25%] rounded-2xl cursor-pointer"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
