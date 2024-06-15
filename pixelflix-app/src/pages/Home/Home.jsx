import "./Home.scss";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Bookmarks from "../Bookmarks/Bookmarks";
import Movies from "../Movies/Movies";
import TV from "../TV/TV";
import Profile from "../../components/Profile/Profile";
import Profiles from "../../components/Profiles/Profiles";
import VideoList from "../../components/VideoList/VideoList";
import TrendingList from "../../components/TrendingList/TrendingList";

export default function Home() {
  return (
    <div className="container">
      <Navbar className="navbar" />
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
  const [videos, setVideos] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const videosCollectionRef = collection(db, "Movies-TV");
  useEffect(() => {
    const getVideos = async () => {
      const data = await getDocs(videosCollectionRef);
      setVideos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(videos);
      setTrendingVideos(videos.filter((video) => video.isTrending === false));
      console.log(trendingVideos);
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
