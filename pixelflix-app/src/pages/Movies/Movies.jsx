import "./Movies.scss";
import React from "react";
import VideoList from "../../components/VideoList/VideoList";
import { useVideos } from "../../context/VideosContext";

export default function Movies() {
  const { moviesList, searchQuery } = useVideos();

  const filteredMovies = moviesList.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <h1 className="home__heading"> Movies </h1>
      <VideoList videos={filteredMovies} />
    </div>
  );
}
