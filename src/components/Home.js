import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "../styles/home.css"
import { Link } from "react-router-dom";
import PostList from "../components/PostList";
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "posts"));
          const postsArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(postsArray);
        } catch (err) {
          setError("Error fetching posts: " + err.message);
        }
      };
      fetchPosts();
    }, []);

  return (
    <div className="home-container">
    <div className="welcome-section">
      <h2>Welcome to the Blog!</h2>
      <p>Explore our latest posts or create your own!</p>
    </div>
    <PostList/>
  </div>
);
};
export default Home;
