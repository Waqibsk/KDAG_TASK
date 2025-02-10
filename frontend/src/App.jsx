import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import PostCard from "./components/PostCard";

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("http://localhost:8000/post");
      console.log(response.data);
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);

      setFilteredPosts(sortedPosts);
    };
    getPosts();
  }, []);
  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, posts]);

  return (
    <div className=" bg-black min-h-screen">
      <div>
        <Navbar />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="bg-white w-[96%] m-5 rounded-lg px-2 py-2"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <div className=" text-white">
        <div>
          <h1 className="my-3 mx-5 text-4xl font-bold font-[Poppins]">Latest Posts</h1>
        </div>
        <div className="grid grid-cols-3 gap-1 max-[880px]:grid-cols-2 max-[1000px]:grid-cols-2 max-[650px]:grid-cols-1 w-[98%] ">
        {filteredPosts.length === 0 ? (
          <div className="m-5">No posts</div>
        ) : (
          filteredPosts.map((post, index) => (
            <PostCard
              id={post._id}
              key={post._id || index}
              title={post.title}
              description={post.description.split(" ").slice(0,20).join(" ")+(post.description.split(" ").length>20?"...":"")}
              createdAt={post.createdAt}
            />
          ))
        )}
      
        </div>
       </div>
    </div>
  );
}

export default App;
