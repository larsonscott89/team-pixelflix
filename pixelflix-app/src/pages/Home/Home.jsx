import "./Home.scss";
import React from "react";

import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";
import Bookmarks from "../Bookmarks/Bookmarks";
import Movies from "../Movies/Movies";
import TV from "../TV/TV";
import Profile from "../../components/Profile/Profile";
import Profiles from "../../components/Profiles/Profiles";

export default function Home() {
  return (
    <div className="container">
      <Navbar className="navbar"/>
      <Searchbar className="searchbar" placeholder_text="movies or TV series"/>
      <Routes>
        <Route path="/" element={<DefaultContent />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </div>
  );
}

function DefaultContent() {
  return (
    <div className="content">
      <h1>Home Page</h1>
    </div>
  );
}
