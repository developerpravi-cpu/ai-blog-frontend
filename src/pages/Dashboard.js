import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    tagInput: "",
    image: null,
    preview: "",
    author: "",
    email: "",
    linkedin: "",
    twitter: "",
    github: "",
    website: "",
  });

  /* ================= EDITOR ================= */
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setPost((prev) => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
  });

  /* ================= 🤖 GENERATE AI ================= */
  const generateAI = async () => {
    if (!post.title.trim()) {
      alert("Please enter a title first");
      return;
    }

    try {
      const res = await fetch("https://ai-blog-backend-ke3o.onrender.com/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          keywords: post.tags.join(","),
        }),
      });

      const data = await res.json();

      editor.commands.setContent(data.content);

      // ✅ IMPORTANT FIX
      setPost((prev) => ({
        ...prev,
        content: data.content,
      }));

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= ✨ IMPROVE CONTENT ================= */
  const improveContent = async () => {
    if (!post.content) {
      alert("Write or generate content first");
      return;
    }

    try {
      const res = await fetch("https://ai-blog-backend-ke3o.onrender.com/api/ai/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: post.content,
        }),
      });

      const data = await res.json();

      editor.commands.setContent(data.content);

      setPost((prev) => ({
        ...prev,
        content: data.content,
      }));

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE PREVIEW ================= */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost({
        ...post,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  /* ================= TAGS ================= */
  const handleAddTag = (e) => {
    if (e.key === "Enter" && post.tagInput.trim()) {
      e.preventDefault();
      setPost({
        ...post,
        tags: [...post.tags, post.tagInput],
        tagInput: "",
      });
    }
  };

  const removeTag = (index) => {
    const updated = post.tags.filter((_, i) => i !== index);
    setPost({ ...post, tags: updated });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("category", post.category);
    formData.append("tags", post.tags.join(","));
    formData.append("image", post.image);

    const token = localStorage.getItem("token");

    const res = await fetch("https://ai-blog-backend-ke3o.onrender.com/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      navigate("/posts");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Create Blog ✍️</h1>
        <p>Write and share your thoughts</p>
      </div>

      <div className="dashboard-content">
        <form className="blog-form" onSubmit={handleSubmit}>

          {/* TITLE */}
          <div className="input-group">
            <label>Title</label>
            <input
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder="Enter blog title..."
            />
          </div>

          {/* AI BUTTONS */}
          {/* <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button type="button" onClick={generateAI}>
              🤖 Generate
            </button>

            <button type="button" onClick={improveContent}>
              ✨ Improve
            </button>
          </div> */}

          {/* EDITOR */}
          <div className="input-group">
            <label>Blog Content</label>
            <div className="editor-box">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* CATEGORY */}
          <div className="input-group">
            <label>Category</label>
            <input
              name="category"
              value={post.category}
              onChange={handleChange}
              placeholder="e.g Tech, AI"
            />
          </div>

          {/* TAGS */}
          <div className="input-group">
            <label>Tags</label>
            <input
              value={post.tagInput}
              onChange={(e) =>
                setPost({ ...post, tagInput: e.target.value })
              }
              onKeyDown={handleAddTag}
              placeholder="Press Enter to add tag"
            />

            <div className="tag-container">
              {post.tags.map((tag, index) => (
                <div className="tag" key={index}>
                  {tag}
                  <span onClick={() => removeTag(index)}>×</span>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div className="form-section">
            <div className="section-title">Banner Image</div>

            <div className="file-upload">
              <input type="file" onChange={handleFileChange} />

              {post.preview && (
                <img
                  src={post.preview}
                  alt="preview"
                  className="image-preview"
                />
              )}
            </div>
          </div>

          {/* AUTHOR */}
          <div className="form-section">
            <div className="section-title">Author Info</div>

            <div className="input-group">
              <div className="social-row">
                <input placeholder="Your name" />
                <input placeholder="your@email.com" />
              </div>
            </div>

            <div className="social-row">
              <input name="linkedin" onChange={handleChange} placeholder="LinkedIn URL" />
              <input name="twitter" onChange={handleChange} placeholder="Twitter URL" />
              <input name="github" onChange={handleChange} placeholder="GitHub URL" />
              <input name="website" onChange={handleChange} placeholder="Website URL" />
            </div>
          </div>

          <button type="submit">Publish 🚀</button>

        </form>
      </div>
    </div>
  );
}

export default Dashboard;