import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditPost.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: null,
    preview: ""
  });
  const editor = useEditor({
    extensions: [StarterKit],
    content: "", // keep empty initially
    onUpdate: ({ editor }) => {
        setPost(prev => ({
        ...prev,
        content: editor.getHTML()
        }));
    }
    });
  const token = localStorage.getItem("token");

  /* ================= FETCH OLD DATA ================= */
  useEffect(() => {
    fetch(`https://ai-blog-backend-ke3o.onrender.com/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost({
          title: data.title,
          content: data.content,
          category: data.category,
          tags: data.tags.join(","),
          image: null,
          preview: data.image
            ? `https://ai-blog-backend-ke3o.onrender.com/uploads/${data.image}`
            : ""
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
        if (editor && post.content) {
            editor.commands.setContent(post.content);
        }
    }, [post.content, editor]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  /* ================= HANDLE IMAGE ================= */
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPost({
        ...post,
        image: file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  /* ================= UPDATE POST ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("category", post.category);
    formData.append("tags", post.tags);

    if (post.image) {
      formData.append("image", post.image);
    }

    const res = await fetch(`https://ai-blog-backend-ke3o.onrender.com/api/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    console.log("RESPONSE:", data);

    if (res.ok) {
      alert("Post updated ✅");
      navigate(`/post/${id}`);
    } else {
      alert(data.message || "Update failed ❌");
    }
  };

  return (
  <div className="edit-page">
    <div className="edit-container">
      <h2>Edit Post</h2>

      <form onSubmit={handleUpdate}>

        <div className="input-group">
          <input
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Title"
          />
        </div>

        <div className="input-group">
            <div className="editor-box">
                <EditorContent editor={editor} />
            </div>
        </div>

        <div className="input-group">
          <input
            name="category"
            value={post.category}
            onChange={handleChange}
            placeholder="Category"
          />
        </div>

        <div className="input-group">
          <input
            name="tags"
            value={post.tags}
            onChange={handleChange}
            placeholder="Tags"
          />
        </div>

        <div className="input-group">
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
          />
        </div>

        {post.preview && (
          <img
            src={post.preview}
            className="image-preview"
            alt="preview"
          />
        )}

        <button className="update-btn">Update Post</button>

      </form>
    </div>
  </div>
);
}

export default EditPost;