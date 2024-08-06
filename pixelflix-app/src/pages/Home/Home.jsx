import "./Home.scss";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";
import Bookmarks from "../Bookmarks/Bookmarks";
import Movies from "../Movies/Movies";
import TV from "../TV/TV";
import Profile from "../ManageProfile/ManageProfile";
import SwitchProfile from "../SwitchProfile/SwitchProfile";
import Account from "../Account/Account";
import VideoList from "../../components/VideoList/VideoList";
import TrendingList from "../../components/TrendingList/TrendingList";
import { useVideos } from "../../context/VideosContext";

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
          <Route path="/manage-profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/switch-profile" element={<SwitchProfile />} />
        </Routes>
      </div>
    </div>
  );
}

function DefaultContent() {
  const { filteredVideos, filteredTrendingVideos } = useVideos();

  return (
    <div className="home">
      <h2 className="home__heading">Trending</h2>
      <TrendingList trendingVideos={filteredTrendingVideos} />
      <h2 className="home__heading">Recommended for you</h2>
      <VideoList videos={filteredVideos} />
    </div>
  );
}
