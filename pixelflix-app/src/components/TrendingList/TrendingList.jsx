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
    <section data-testid="trending-list" className="trending__list">
      <div className="trendcards">
        {trendingVideos?.map((video) => {
          const isBookmarked = currentProfile?.bookmarks.some(
            (bookmark) => bookmark.id === video.id
          );

          return (
            <div
              key={video.id}
              className="trendcard"
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            >
              <div
                className="trendcard__bookmark-bg"
                onClick={() => toggleBookmark(video)}
              >
                <img
                  className="trendcard__bookmark-icon"
                  src={isBookmarked ? bookmarkFull : bookmarkEmpty}
                />
              </div>
              <div className="trendcard__info">
                <p className="trendcard__info-text trendcard__info-year">
                  {video.year}
                </p>
                <p className="trendcard__info-bullet">•</p>
                <div className="trendcard__info-category-container">
                  <img
                    className="trendcard__info-category-icon"
                    src={video.category === "Movie" ? movieIcon : tvIcon}
                  />
                  <p className="trendcard__info-text trendcard__info-category">
                    {video.category}
                  </p>
                </div>
                <p className="trendcard__info-bullet">•</p>
                <p className="trendcard__info-text trendcard__info-rating">
                  {video.rating}
                </p>
              </div>
              <p className="trendcard__info-text trendcard__info-title">
                {video.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
