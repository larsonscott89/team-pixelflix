import "./Bookmarks.scss";
import React from "react";
import VideoList from "../../components/VideoList/VideoList";
import { useProfile } from "../../context/ProfileContext";

export default function Bookmarks() {
  const { currentProfile } = useProfile();

  return (
    <div className="content" role="main" aria-labelledby="bookmarks-header">
      <h1 id="bookmarks-header" data-testid="bookmarks-header" className="home__heading">Bookmarks</h1>
      {currentProfile.bookmarks.length > 0 ? (
        <VideoList videos={currentProfile.bookmarks} aria-label="Bookmarks List"/>
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
}
