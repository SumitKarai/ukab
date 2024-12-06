import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setContent(data.content);
      } else {
        alert("Post not found!");
        navigate("/");
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "posts", id), { title, content });
      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (err) {
      alert("Error updating post: " + err.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Post</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
