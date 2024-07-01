import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [showsList, setShowsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      const videosCollectionRef = collection(db, "Movies-TV");
      const data = await getDocs(videosCollectionRef);
      const fetchedVideos = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setVideos(fetchedVideos);

      const trending = fetchedVideos.filter(
        (video) => video.isTrending === true
      );
      setTrendingVideos(trending);

      const movies = fetchedVideos.filter(
        (video) => video.category === "Movie"
      );
      setMoviesList(movies);

      const shows = fetchedVideos.filter(
        (video) => video.category === "TV Series"
      );
      setShowsList(shows);
    };
    fetchVideos();
  }, []);

  return (
    <VideoContext.Provider
      value={{
        videos,
        trendingVideos,
        moviesList,
        showsList,
        setVideos,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => useContext(VideoContext);
