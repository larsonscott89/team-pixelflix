import "./Movies.scss";
import React from "react";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Movies() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    try {
      signOut(auth);
      console.log("User has successfully signed out.");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Movies Page</h1>
      </div>
    </div>
  );
}
