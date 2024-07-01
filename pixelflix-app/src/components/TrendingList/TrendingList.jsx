import React from "react";
import "./TrendingList.scss";
import movieIcon from "../../assets/icons/icon-category-movie.svg";
import tvIcon from "../../assets/icons/icon-category-tv.svg";

export default function TrendingList({ trendingVideos }) {
  return (
    <div data-testid="trending-list" className="trendcards">
      {trendingVideos?.map((video) => {
        return (
          <div
            key={video.id}
            className="trendcard"
            style={{ backgroundImage: `url(${video.thumbnail})` }}
          >
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
  );
}
