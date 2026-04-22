import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("https://ai-blog-backend-new.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        });

        const data = await res.json();

        setMessage(data.message);

        setForm({ username: "", email: "", password: "" });

        // ✅ redirect after 2 sec
        setTimeout(() => {
        navigate("/login");
        }, 2000);

    } catch (err) {
        setMessage("Something went wrong");
    }
    };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2> <p style={{ color: "#ccc" }}>Already have account?{" "}
        <a href="/login" style={{ color: "#d4a017", textDecoration: "none" }}>
            Login
        </a></p>
      <form onSubmit={handleSubmit}>
        <div>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
            />
        </div>

        <div>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
             />
        </div>

        <div>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
            />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;