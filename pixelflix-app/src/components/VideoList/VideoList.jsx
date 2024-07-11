import React from "react";
import "./VideoList.scss";
import movieIcon from "../../assets/icons/icon-category-movie.svg";
import tvIcon from "../../assets/icons/icon-category-tv.svg";

export default function VideoList({ videos }) {
  return (
    <div data-testid="video-list" className="card__container">
      {videos?.map((video) => {
        return (
          <div key={video.id} className="card">
            <img className="card__image" src={video.thumbnail} />
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
