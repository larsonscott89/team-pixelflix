import "./Movies.scss"
import React from "react"
import VideoList from "../../components/VideoList/VideoList"
import { useVideos } from "../../context/VideosContext"

export default function Movies() {
  const { moviesList } = useVideos()

  return (
    <div className="home">
      <h1 className="home__heading"> Movies </h1>
      <VideoList videos={moviesList} />
    </div>
  )
}