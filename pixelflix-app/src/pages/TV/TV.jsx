import "./TV.scss"
import React from "react"
import VideoList from "../../components/VideoList/VideoList"
import { useVideos } from "../../context/VideosContext"

export default function TV() {
  const { videos } = useVideos()
  const TV = videos.filter(video => video.category === "TV Series")

  return (
    <div className="content">
      <h1>TV Series</h1>
      <VideoList videos={TV} />
    </div>
  )
}