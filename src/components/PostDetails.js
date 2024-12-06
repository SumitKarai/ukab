import React, { useEffect, useState, useContext } from "react"; // Ensure `useContext` is imported
import { useParams, Link, useNavigate } from "react-router-dom"; // Ensure `Link` and `useParams` are imported
import { db } from "../firebase-config"; // Update path if needed
import { doc, getDoc, deleteDoc } from "firebase/firestore"; // Firestore methods
import { AuthContext } from "../context/AuthContext"; // Ensure the AuthContext path is correct
import "../styles/postDetails.css"; // Include CSS for styling

const PostDetails = () => {
  const { id } = useParams(); // Extract the post ID from the URL
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirecting after deletion

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          setError("Post not found!");
        }
      } catch (err) {
        setError("Error fetching post: " + err.message);
      }
    };
    fetchPost();
    console.log("Logged-in User:", user);

  }, [id]);

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
      alert("Post deleted successfully!");
      navigate("/"); // Redirect to home page
    } catch (err) {
      alert("Error deleting post: " + err.message);
    }
  };

  return (
    <div className="post-details-container">
      {error ? (
        <p className="error">{error}</p>
      ) : post ? (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p><small>Posted on: {post.createdAt?.toDate().toLocaleString()}</small></p>
          {user && user.uid === post.userId && ( // Show delete and edit options only for creator
            <div className="action-buttons">
              <button onClick={handleDelete} className="delete-button">
                Delete Post
              </button>
              <Link to={`/editpost/${id}`} className="edit-button">
                Edit Post
              </Link>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetails;
