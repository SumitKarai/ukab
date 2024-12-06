import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Successfully signed out!");
    } catch (error) {
      alert("Error signing out: " + error.message);
    }
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/createpost">Create Post</Link>
          <div className="user-info">
            {/* Display User Name */}
            <span>{user.displayName || "User"}</span>

            {/* Display User Profile Picture */}
            {user.photoURL && <img src={user.photoURL} alt="User Profile" style={{ width: "30px", borderRadius: "50%" }} />}
          </div>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> {/* Add Sign Up link */}
        </>
      )}
    </nav>
  );
};

export default Navbar;
