import "./TV.scss";
import React from "react";
import VideoList from "../../components/VideoList/VideoList";
import { useVideos } from "../../context/VideosContext";

export default function TV() {
  const { filteredShows } = useVideos();

  return (
    <div className="home" role="main" aria-labelledby="tv-header">
      <h1 id="tv-header" data-testid="tv-header" className="home__heading">TV Series</h1>
      {filteredShows.length > 0 ? (
        <VideoList videos={filteredShows}/>
      ) : (
        <p>No TV shows found.</p>
      )}
    </div>
  );
}
