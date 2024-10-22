import "./Searchbar.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { BsX } from 'react-icons/bs'
import searchIcon from "../../assets/icons/icon-search.svg";
import { useVideos } from "../../context/VideosContext";

function Searchbar() {
  const location = useLocation();
  const { setSearchQuery } = useVideos();
  const [query, setQuery] = useState("");

  let placeholderText = "movies or TV series";
  if (location.pathname === "/movies") {
    placeholderText = "movies";
  } else if (location.pathname === "/tv") {
    placeholderText = "TV series";
  } else if (location.pathname === "/bookmarks") {
    placeholderText = "bookmarked shows";
  }

  const handleSearchChange = (event) => {
    const trimmedQuery = event.target.value.trim();
    setQuery(trimmedQuery);
    setSearchQuery(trimmedQuery);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchQuery("");
  };

  return (
    <section data-testid="searchbar-section" className='searchbar__container' aria-label="Searchbar for videos">
      <div className='searchbar'>
        <div className="searchbar__imgcontainer" aria-hidden="true">
          <img data-testid="search-icon" className='searchbar__icon' src={searchIcon} alt="Search icon"/>
        </div>
        <input
          type="text"
          placeholder={`Search for ${placeholderText}`}
          value={query}
          onChange={handleSearchChange}
          aria-label={`Search for ${placeholderText}`}
        />
        {query && (
          <BsX
            className="searchbar__clear-button"
            onClick={handleClearSearch}
            aria-label="Clear search query"
            tabindex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClearSearch();
              }
            }}
          /> 
        )}
      </div>
    </section>
  );
}

export default Searchbar;
