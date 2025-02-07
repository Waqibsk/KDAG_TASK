import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import PostCard from "./components/PostCard";
function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("http://localhost:8000/post");
      console.log(response.data);

      setPosts(response.data);
    };
    getPosts();
  }, []);

  return (
    <div className=" bg-black min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className=" text-white">
        <div>
          <h1 className="m-5 text-3xl font-bold">Latest Posts</h1>
        </div>
        {posts.length === 0 ? (
          <div>Loading</div>
        ) : (
          posts.map((post, index) => (
            <PostCard
              id={post._id}
              key={post._id || index}
              title={post.title}
              description={post.description}
              createdAt={post.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
