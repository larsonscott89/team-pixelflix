import "./Home.scss";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";
import Bookmarks from "../Bookmarks/Bookmarks";
import Movies from "../Movies/Movies";
import TV from "../TV/TV";
import Profile from "../Profile/Profile";
import Account from "../Account/Account";
import VideoList from "../../components/VideoList/VideoList";
import TrendingList from "../../components/TrendingList/TrendingList";

export default function Home() {
  return (
    <div className="base">
      <Navbar />
      <Searchbar />
      <div className="base__content">
        <Routes>
          <Route path="/" element={<DefaultContent />} />
          <Route path="/home" element={<DefaultContent />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
}

function DefaultContent() {
  const [videos, setVideos] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const videosCollectionRef = collection(db, "Movies-TV");
  useEffect(() => {
    const getVideos = async () => {
      const data = await getDocs(videosCollectionRef);
      const fetchedVideos = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setVideos(fetchedVideos);
      const trending = fetchedVideos.filter(
        (video) => video.isTrending === true
      );
      setTrendingVideos(trending);
    };
    getVideos();
  }, []);
  return (
    <div className="home">
      <h2 className="home__heading">Trending</h2>
      <TrendingList trendingVideos={trendingVideos} />
      <h2 className="home__heading">Recommended for you</h2>
      <VideoList videos={videos} />
    </div>
  );
}
