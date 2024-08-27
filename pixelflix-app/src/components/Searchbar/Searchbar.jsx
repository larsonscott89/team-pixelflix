import "./Searchbar.scss";
import { useLocation } from "react-router-dom";
import searchIcon from "../../assets/icons/icon-search.svg";
import { useVideos } from "../../context/VideosContext";


function Searchbar() {
  const location = useLocation();
  const { setSearchQuery } = useVideos();

  const hiddenRoutes = ["/account", "/manage-profile", "/switch-profile"];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  let placeholderText = "movies or TV series";
  if (location.pathname === "/movies") {
    placeholderText = "movies";
  } else if (location.pathname === "/tv") {
    placeholderText = "TV series";
  } else if (location.pathname === "/bookmarks") {
    placeholderText = "bookmarked shows";
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section data-testid="searchbar-section" className='searchbar__container'>
      <div className='searchbar'>
        <div className="searchbar__imgcontainer">
          <img data-testid="search-icon" className='searchbar__icon' src={searchIcon}/>
        </div>
        <textarea
          placeholder={`Search for ${placeholderText}`}
          onChange={handleSearchChange}
        ></textarea>
      </div>
    </section>
  );
}

export default Searchbar;
