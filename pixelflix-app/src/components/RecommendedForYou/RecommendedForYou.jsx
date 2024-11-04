import React from 'react';

import VideoList from '../../components/VideoList/VideoList';

function RecommendedForYou({ videos }) {
  return (
    <div className="recommended-for-you">
      {videos.length > 0 ? (
        <VideoList videos={videos} />
      ) : (
        <p>No recommendations available based on your bookmarks.</p>
      )}
    </div>
  );
}

export default RecommendedForYou;