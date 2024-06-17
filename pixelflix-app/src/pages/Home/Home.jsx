import "./Home.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";
import Bookmarks from "../Bookmarks/Bookmarks";
import Movies from "../Movies/Movies";
import TV from "../TV/TV";
import Profile from "../Profile/Profile";
import Account from "../Account/Account";

export default function Home() {
  return (
    <div className="container">
      <Navbar className="navbar"/>
      <Searchbar className="searchbar"/>
      <Routes>
        <Route path="/" element={<DefaultContent/>} />
        <Route path="/home" element={<DefaultContent/>} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
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
