import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./components/Home";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Use the Navbar component here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/createpost" element={
                 <ProtectedRoute>
                               <CreatePost />
                </ProtectedRoute>
                                  }
                                   />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route
  path="/editpost/:id"
  element={
    <ProtectedRoute>
      <EditPost />
    </ProtectedRoute>
  }
/>;
      </Routes>
    </Router>
  );
};

export default App;
