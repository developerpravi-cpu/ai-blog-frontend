import { useEffect, useState } from "react";
import "../styles/Posts.css";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://ai-blog-backend-new.onrender.com/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  const goToPost = (id) => {
    window.location.href = `/post/${id}`;
  };

  return (
    <div className="posts-container">
      <h1>All Posts</h1>

      <div className="posts-grid">
        {posts.map((post) => (
          <div
            key={post._id}
            className="post-card"
            onClick={() => goToPost(post._id)}
          >
            {/* IMAGE */}
            <img
              src={`https://ai-blog-backend-new.onrender.com/uploads/${post.image}`}
              alt="banner"
              className="post-image"
            />

            {/* CONTENT */}
            <div className="post-content">
              <h2>{post.title}</h2>

              <p className="author">
                ✍️ {post.authorName || "Pravi"}
              </p>

              <p className="category">{post.category}</p>

              <div className="tags">
                {post.tags?.map((tag, i) => (
                  <span key={i}>#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;