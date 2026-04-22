import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

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

  return (
    <div className="home">

      {/* HERO */}
      {/* <div className="hero">
        <div className="hero-content">
          <h1>AI Blog Platform</h1>
          <p>Write smarter. Share faster. Let AI boost your creativity.</p>

          <div className="hero-buttons">
            {user ? (
              <button onClick={() => navigate("/dashboard")}>
                ✍️ Start Writing
              </button>
            ) : (
              <>
                <button onClick={() => navigate("/signup")}>
                  Sign Up
                </button>
                <button onClick={() => navigate("/login")} className="outline">
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div> */}

      <div className="hero">
  <div className="hero-container">
    
    {/* LEFT CONTENT */}
    <div className="hero-left">
      <h1>AI Blog Platform</h1>
      <p>Write smarter. Share faster. Let AI boost your creativity.</p>

      <div className="hero-buttons">
        {user ? (
          <button onClick={() => navigate("/dashboard")}>
            ✍️ Start Writing
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/signup")}>
              Sign Up
            </button>
            <button onClick={() => navigate("/login")} className="outline">
              Login
            </button>
          </>
        )}
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="hero-right">
      <img
        src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
        alt="AI"
      />
    </div>

  </div>
</div>

      {/* FEATURES */}
      <div className="features">
        <div className="feature-card">
          <h3>⚡ Fast Writing</h3>
          <p>Create blogs instantly with a modern editor</p>
        </div>

        <div className="feature-card">
          <h3>🤖 AI Powered</h3>
          <p>Generate blog ideas and content in seconds</p>
        </div>

        <div className="feature-card">
          <h3>🌍 Share Easily</h3>
          <p>Publish and reach your audience globally</p>
        </div>
      </div>

      {/* LATEST BLOGS */}
      <div className="latest">
        <h2>Latest Blogs</h2>

        <div className="blog-grid">
          {posts.slice(0, 3).map((post) => (
            <div className="blog-card" key={post._id}>
              
              {post.image && (
                <img
                  src={`https://ai-blog-backend-new.onrender.com/uploads/${post.image}`}
                  alt="blog"
                />
              )}

              <div className="blog-content">
                <h3>{post.title}</h3>

                <p
                  dangerouslySetInnerHTML={{
                    __html: post.content.slice(0, 100),
                  }}
                />

                <button onClick={() => navigate(`/post/${post._id}`)}>
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
    <footer className="footer">
        <div className="footer-container">

            {/* LEFT SIDE */}
            <div className="footer-left">
            <h2>AI Blog</h2>
            <p>Write smarter. Share faster.</p>
            </div>

            {/* RIGHT SIDE */}
            <div className="footer-right">
            <h4>Contact</h4>
            <p>📧 praveen.code.dev@gmail.com</p>
            </div>

        </div>

        <div className="footer-bottom">
            © 2026 AI Blog Platform
        </div>
    </footer>
    </div>
  );
}

export default Home;