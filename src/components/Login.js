import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    // Handle Email and Password Sign-In
    const handleEmailSignIn = async (e) => {
      e.preventDefault();
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/"); // Redirect to Home or any other page after successful login
      } catch (err) {
        setError(err.message);
      }
    };
  
    // Handle Google Sign-In
    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        navigate("/"); // Redirect to Home or any other page after successful login
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleEmailSignIn}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login In with Email</button>
        </form>
  
        <p>or</p>
  
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
  
        {error && <p className="error">{error}</p>}
      </div>
    );
  };
  
  export default Login;