import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function PostPage() {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/post/${id}`);
        setPostDetails(response.data);
      } catch (err) {
        console.error("Error fetching post details:", err);
      }
    };
    fetchPostDetails();
  }, [id]);


  if (!postDetails) {
    return (
      <div>
        <Navbar />
        <div className="m-5 text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="pb-4 m-5">
        <div className="font-semibold text-3xl">
          {postDetails.title.charAt(0).toUpperCase() + postDetails.title.slice(1)}
        </div>
        <div className="font-md text-2xl">
          {postDetails.description}
        </div>
        {/* <div className="">
            <h1 className="text-2xl font-semibold">Comments</h1>
            <div>
                {}
            </div>
        </div> */}
      </div>
    </div>
  );
}
