import "./Movies.scss";
import React from "react";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";

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
      <Navbar className="navbar"/>
      <Searchbar className="searchbar" placeholder_text="movies"/>
      <div className="content">
        <h1>Movies Page</h1>
        <button onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
