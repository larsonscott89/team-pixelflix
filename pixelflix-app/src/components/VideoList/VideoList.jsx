import React from "react";
import "./VideoList.scss";
import movieIcon from "../../assets/icons/icon-category-movie.svg";
import tvIcon from "../../assets/icons/icon-category-tv.svg";
import bookmarkEmpty from "../../assets/icons/icon-bookmark-empty.svg";
import bookmarkFull from "../../assets/icons/icon-bookmark-full.svg";
import { useProfile } from "../../context/ProfileContext";

export default function VideoList({ videos }) {
  const { currentProfile, toggleBookmark } = useProfile();

  return (
    <div data-testid="video-list" className="card__container" role="list">
      {videos?.map((video) => {
        const isBookmarked = currentProfile?.bookmarks.some(
          (bookmark) => bookmark.id === video.id
        );

        return (
          <div
            key={video.id}
            className="card"
            role="listitem"
            aria-label={`Video: ${video.title}`}
          >
            <div
              className="card__image"
              style={{ backgroundImage: `url(${video.thumbnail})` }}
              role="img"
              aria-label={`Thumbnail for ${video.title}`}
              aria-hidden="true"
            >
              <button
                className="card__image-bookmark-bg"
                onClick={() => toggleBookmark(video)}
                aria-pressed={isBookmarked}
                aria-label={
                  isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
                }
                type="button"
              >
                <img
                  className="card__image-bookmark-icon"
                  src={isBookmarked ? bookmarkFull : bookmarkEmpty}
                  alt={isBookmarked ? "Bookmarked" : "Not bookmarked"}
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="card__info">
              <p
                className="card__info-text card__info-year"
                aria-label="Release year"
              >
                {video.year}
              </p>
              <p className="card__info-bullet" aria-hidden="true">
                •
              </p>
              <div className="card__info-category-container">
                <img
                  className="card__info-category-icon"
                  src={video.category === "Movie" ? movieIcon : tvIcon}
                  alt="Category Icon"
                  aria-hidden="true"
                />
                <p
                  className="card__info-text card__info-category"
                  aria-label="Category"
                >
                  {video.category}
                </p>
              </div>
              <p className="card__info-bullet" aria-hidden="true">
                •
              </p>
              <p
                className="card__info-text card__info-rating"
                aria-label="Rating"
              >
                {video.rating}
              </p>
            </div>
            <p className="card__info-text card__info-title" aria-label="Title">
              {video.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
