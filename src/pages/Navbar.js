import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ SAFE USER PARSE
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    user = stored && stored !== "undefined" ? JSON.parse(stored) : null;
  } catch (err) {
    localStorage.removeItem("user");
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddBlog = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  // hide navbar on auth pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="logo">AI Blog</div>

      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/posts">Blogs</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="navbar-right">
        <button className="add-btn" onClick={handleAddBlog}>
          + Add Blog
        </button>

        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;