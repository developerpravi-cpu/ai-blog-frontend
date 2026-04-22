import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import AllPosts from "./pages/AllPosts";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import Navbar from "./pages/Navbar";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
    {/* Navbar will show on all pages except auth */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;