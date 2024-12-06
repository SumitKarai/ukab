import "../styles/createpost.css";
import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext); // Get the logged-in user

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        userId: user.uid, // Add user ID to the post
        createdAt: new Date(),
      });
      alert("Post created successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      setError("Error creating post: " + err.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Create a New Post</h1>
      <form onSubmit={handlePost}>
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
        <button type="submit">Submit Post</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CreatePost;
