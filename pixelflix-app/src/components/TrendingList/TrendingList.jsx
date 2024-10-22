import React, { useEffect, useState, useRef } from "react";
import "./TrendingList.scss";
import movieIcon from "../../assets/icons/icon-category-movie.svg";
import tvIcon from "../../assets/icons/icon-category-tv.svg";
import bookmarkEmpty from "../../assets/icons/icon-bookmark-empty.svg";
import bookmarkFull from "../../assets/icons/icon-bookmark-full.svg";
import { useProfile } from "../../context/ProfileContext";

export default function TrendingList({ trendingVideos }) {
  const { currentProfile, toggleBookmark } = useProfile();

  return (
    <section data-testid="trending-list" className="trending__list" aria-label="Trending Videos">
      <div className="trendcards" role="list">
        {trendingVideos?.map((video) => {
          const isBookmarked = currentProfile?.bookmarks.some(
            (bookmark) => bookmark.id === video.id
          );

          return (
            <div
              key={video.id}
              className="trendcard"
              role="listitem" 
              aria-label={`Video: ${video.title}`}
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            >
              <button
                className="trendcard__bookmark-bg"
                onClick={() => toggleBookmark(video)}
                aria-pressed={isBookmarked}
                aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                type="button"
              >
                <img
                  className="trendcard__bookmark-icon"
                  src={isBookmarked ? bookmarkFull : bookmarkEmpty}
                  alt={isBookmarked ? "Bookmarked" : "Not bookmarked"}
                  aria-hidden="true"
                />
              </button>
              <div className="trendcard__info">
                <p className="trendcard__info-text trendcard__info-year" aria-label="Release year">
                  {video.year}
                </p>
                <p className="trendcard__info-bullet" aria-hidden="true">•</p>
                <div className="trendcard__info-category-container">
                  <img
                    className="trendcard__info-category-icon"
                    src={video.category === "Movie" ? movieIcon : tvIcon}
                    alt="Category Icon"
                    aria-hidden="true"
                  />
                  <p className="trendcard__info-text trendcard__info-category" aria-label="Category">
                    {video.category}
                  </p>
                </div>
                <p className="trendcard__info-bullet" aria-hidden="true">•</p>
                <p className="trendcard__info-text trendcard__info-rating" aria-label="Rating">
                  {video.rating}
                </p>
              </div>
              <p className="trendcard__info-text trendcard__info-title" aria-label="Title">
                {video.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
