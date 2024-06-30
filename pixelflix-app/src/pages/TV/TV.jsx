import "./TV.scss"
import React from "react"
import VideoList from "../../components/VideoList/VideoList"
import { useVideos } from "../../context/VideosContext"

export default function TV() {
  const { showsList } = useVideos()

  return (
    <div className="home">
      <h1 className="home__heading">TV Series</h1>
      <VideoList videos={showsList} />
    </div>
  )
}