import "./Bookmarks.scss";
import React from "react";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Bookmarks() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="content">
        <h1>Bookmarks Page</h1>
      </div>
    </div>
  );
}
