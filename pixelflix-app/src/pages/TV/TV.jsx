import "./TV.scss";
import React from "react";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function TV() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="content">
        <h1>TV Page</h1>
      </div>
    </div>
  );
}
