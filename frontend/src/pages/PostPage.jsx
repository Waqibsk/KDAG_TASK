import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import deleteIcon from "../assets/bin.png"
export default function PostPage() {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/post/${id}`);
        setPostDetails(response.data);
        setComments(response.data.comments);
      } catch (err) {
        console.error("Error fetching post details:", err);
      }
    };
    fetchPostDetails();
  }, [id]);

  const handleCommentDelete = async (commentId) => {
    try {
      console.log("this is comment id", commentId);
      const response = await axios.post(
        `http://localhost:8000/post/${id}/comment/${commentId}`
      );
      setComments((prevComments) =>
        prevComments.filter((c) => c._id !== commentId)
      );
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/post/${id}/comment`,
        {
          text: comment,
        }
      );
      
      setComments((prevComments) => [...prevComments, response.data]);

      setComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (!postDetails) {
    return (
      <div>
        <Navbar />
        <div className="m-5 text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="text-white bg-black min-h-screen ">
      <Navbar />
      
      <div className="pb-4 m-5 flex flex-col  my-5">
        <div className=" my-9 ">
        <div className="font-bold text-5xl mb-5   font-[Poppins]">
          {postDetails.title.charAt(0).toUpperCase() +
            postDetails.title.slice(1)}
        </div>
        <div className="text-2xl font-medium whitespace-pre-line font-[Merriweather]">{postDetails.description}</div>

        </div>
       
        <div className="my-7">
          <h1 className="text-2xl font-semibold font-[Poppins]">Add Comment</h1>
          <div className="flex ">
            <textarea
              type="text"
              placeholder="Write a comment..."
              className="w-[40%] h-30 border border-gray-300 p-2 rounded-lg my-2 font-[Nunito]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="">
            <button
              className="bg-white  text-black cursor-pointer px-4 py-2 my-2 rounded-lg hover:bg-gray-200 transition duration-200 font-[Raleway]"
              onClick={handleAddComment}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="text-2xl">
          <h1 className="text-2xl font-semibold font-[Poppins]">Comments</h1>
          <div className="mt-2 space-y-3">
            {comments.length > 0 ? (
              comments.map((c, index) => {
                // console.log("this is comment id", c._id);

                return (
                  <div
                    key={index}
                    className="bg-gray-800 p-3 flex justify-between rounded-md text-white"
                  >
                    <div className="text-sm">{c.text}</div>
                    <div
                      className=" text-black cursor-pointer flex  items-center"
                      onClick={() => {
                        handleCommentDelete(c._id);
                      }}
                    >
                    <img src={deleteIcon} alt="Delete" className="w-4 filter invert  " />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 font-[Merriweather]">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
