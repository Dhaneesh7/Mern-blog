import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPosts(data);
    };
    if (token) fetchPosts();
  }, [token]);

  const handleCreate = async () => {
    if (!newPost.title || !newPost.content) return alert("Fill all fields");
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(newPost),
    });
    if (res.ok) {
      const createdPost = await res.json();
      setPosts([...posts, createdPost]);
      setNewPost({ title: "", content: "" });
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Your Posts</h2>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        className="border p-2 w-full mb-2"
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
      />
      <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded mb-6">
        Add Post
      </button>

      <h3 className="text-xl font-bold mb-4">Your Posts</h3>
      {posts.map((post) => (
        <div key={post._id || post.id} className="border p-4 mb-4 rounded shadow">
          <h4 className="text-lg font-semibold">{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
