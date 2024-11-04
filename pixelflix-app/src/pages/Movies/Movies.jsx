import "./Movies.scss";
import React from "react";
import VideoList from "../../components/VideoList/VideoList";
import { useVideos } from "../../context/VideosContext";

export default function Movies() {
  const { filteredMovies } = useVideos();

  return (
    <div className="home" role="main" aria-labelledby="movies-header">
      <h1 id="movies-header" data-testid="movies-header" className="home__heading"> Movies </h1>
      {filteredMovies.length > 0 ? (
        <VideoList videos={filteredMovies} />
      ) : (
        <p className="No-Movies-Found">No movies found.</p>
      )}
    </div>
  );
}
