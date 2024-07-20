import React from "react";
import "./VideoList.scss";
import movieIcon from "../../assets/icons/icon-category-movie.svg";
import tvIcon from "../../assets/icons/icon-category-tv.svg";
import bookmarkEmpty from "../../assets/icons/icon-bookmark-empty.svg";
import bookmarkFull from "../../assets/icons/icon-bookmark-full.svg";
import { useProfile } from "../../context/ProfileContext";

export default function VideoList({ videos }) {
  const { currentProfile, toggleBookmark } = useProfile();
  // console.log(currentProfile.bookmarks);

  return (
    <div data-testid="video-list" className="card__container">
      {videos?.map((video) => {
        const isBookmarked = currentProfile?.bookmarks.some(
          (bookmark) => bookmark.id === video.id
        );

        return (
          <div key={video.id} className="card">
            <div
              className="card__image"
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            >
              <div
                className="card__image-bookmark-bg"
                onClick={() => toggleBookmark(video)}
              >
                <img
                  className="card__image-bookmark-icon"
                  src={isBookmarked ? bookmarkFull : bookmarkEmpty}
                />
              </div>
            </div>
            <div className="card__info">
              <p className="card__info-text card__info-year">{video.year}</p>
              <p className="card__info-bullet">•</p>
              <div className="card__info-category-container">
                <img
                  className="card__info-category-icon"
                  src={video.category === "Movie" ? movieIcon : tvIcon}
                />
                <p className="card__info-text card__info-category">
                  {video.category}
                </p>
              </div>
              <p className="card__info-bullet">•</p>
              <p className="card__info-text card__info-rating">
                {video.rating}
              </p>
            </div>
            <p className="card__info-text card__info-title">{video.title}</p>
          </div>
        );
      })}
    </div>
  );
}
