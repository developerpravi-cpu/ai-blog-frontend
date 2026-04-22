import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://ai-blog-backend-ke3o.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    // ❗ CHECK SUCCESS
    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }
    // Verify token exists
    localStorage.setItem("token", data.token);
    // ✅ STORE ONLY IF SUCCESS
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/");

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="login-container">
      <h2>Login</h2> <p>Don’t have account? <a href="/signup">Signup</a></p>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;