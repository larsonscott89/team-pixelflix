import "./Bookmarks.scss";
import React from "react";
import VideoList from "../../components/VideoList/VideoList";
import { useProfile } from "../../context/ProfileContext";

export default function Bookmarks() {
  const { currentProfile } = useProfile();

  return (
    <div className="content">
      <h1 data-testid="bookmarks-header" className="home__heading">Bookmarks</h1>
      <VideoList videos={ currentProfile.bookmarks} />
    </div>
  );
}
