import "./Movies.scss"
import React from "react"
import VideoList from "../../components/VideoList/VideoList"
import { useVideos } from "../../context/VideosContext"

export default function Movies() {
  const { videos } = useVideos()
  const movies = videos.filter(video => video.category === "Movie")

  return (
    <div className="content">
      <h1>Movies Page</h1>
      <VideoList videos={movies} />
    </div>
  )
}