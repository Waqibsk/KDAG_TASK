import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

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
        setComments(response.data.comments || []);
      } catch (err) {
        console.error("Error fetching post details:", err);
      }
    };
    fetchPostDetails();
  }, [id]);

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/post/${id}/comment`,
        {
          text: comment,
        }
      );

      setComments([...comments, response.data]);
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
    <div>
      <Navbar />
      <div className="pb-4 m-5 flex flex-col">
        <div className="font-semibold text-3xl">
          {postDetails.title.charAt(0).toUpperCase() +
            postDetails.title.slice(1)}
        </div>
        <div className="text-2xl">{postDetails.description}</div>

        <div className="my-7">
          <h1 className="text-2xl font-semibold">Add Comment</h1>
          <div className="flex ">
            <textarea
              type="text"
              placeholder="Write a comment..."
              className="w-[40%] h-30 border border-gray-300 p-2 rounded-lg my-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="">
            <button
              className="bg-blue-500 text-white px-4 py-2 my-2 rounded-lg hover:bg-blue-600"
              onClick={handleAddComment}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="text-2xl">
          <h1 className="text-2xl font-semibold">Comments</h1>
          <div className="mt-2 space-y-3">
            {comments.length > 0 ? (
              comments.map((c, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-md">
                  {c.text}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
