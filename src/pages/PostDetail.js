import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PostDetail.css";
import { useNavigate } from "react-router-dom";
function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    
  useEffect(() => {
    fetch(`https://ai-blog-backend-ke3o.onrender.com/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch post");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 className="status">Loading...</h2>;
  if (error) return <h2 className="status error">{error}</h2>;

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="post-page">
      
      {/* 🔥 FULL WIDTH BANNER */}
      {post.image && (
        <div className="banner">
          <img
            src={`https://ai-blog-backend-ke3o.onrender.com/uploads/${post.image}`}
            alt="banner"
          />
          <div className="banner-overlay" />
        </div>
      )}

      {/* CONTENT */}
      <div className="post-container">
        {/* TITLE */}
        <h1 className="post-title">{post.title}</h1>
        {/* {user && post.author?.toString() === user?._id && ( */}
            <button
            className="edit-btn"
            onClick={() => navigate(`/edit/${post._id}`)}
            >
            ✏️ Edit
            </button>
        {/* )} */}
        {/* AUTHOR */}
        <div className="post-meta">
          <span>✍️ {post.author?.username|| "Pravi"}</span>
          <span>• {new Date(post.createdAt).toDateString()}</span>
        </div>

        {/* TAGS */}
        <div className="post-tags">
          {post.tags?.map((tag, i) => (
            <span key={i}>#{tag}</span>
          ))}
        </div>

        {/* CONTENT */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}

export default PostDetail;