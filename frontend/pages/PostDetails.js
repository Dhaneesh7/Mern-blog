import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then(setPost)
      .catch(() => setPost(null));
  }, [id]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {post ? (
        <>
          <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
          <p>{post.content}</p>
        </>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostDetails;
