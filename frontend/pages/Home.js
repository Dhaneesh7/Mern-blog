import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
      <input
        type="text"
        placeholder="Search posts..."
        className="border p-2 mb-6 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map((post) => (
          <div
            key={post._id}
            className="border p-4 mb-6 rounded shadow hover:bg-gray-100 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <Link to={`/post/${post._id}`} className="text-blue-600 hover:underline">
              Read More
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
