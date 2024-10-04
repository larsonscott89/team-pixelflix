import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";

export default function Account() {
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
    <div className="content">
      <h1>Account Page</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
