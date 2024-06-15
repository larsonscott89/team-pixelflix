import "./Movies.scss";
import React from "react";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Movies() {
  const navigate = useNavigate();

  return (
    <div className="content">
      <h1>Movies Page</h1>
    </div>
  );
}
