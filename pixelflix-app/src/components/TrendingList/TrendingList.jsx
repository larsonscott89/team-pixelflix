import React from "react";
import "./TrendingList.scss";

export default function TrendingList({ trendingVideos }) {
  return (
    <div>
      {trendingVideos?.map((video) => {
        return (
          <div key={video.id} className="trendcard">
            <p>{video.title}</p>
          </div>
        );
      })}
    </div>
  );
}
