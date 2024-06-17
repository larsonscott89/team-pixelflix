import './Searchbar.scss'
import { useLocation } from "react-router-dom";
import searchIcon from "../../assets/icons/icon-search.svg"

function Searchbar() {
  const location = useLocation();
  let placeholder_text = "movies or TV series";
  if (location.pathname === "/movies") {
    placeholder_text = "movies";
  } else if (location.pathname === "/tv") {
    placeholder_text = "TV series";
  } else if (location.pathname === "/bookmarks") {
    placeholder_text = "bookmarked shows";
  }

  return (
    <section className='searchbar__container'>
      <div className='searchbar'>
        <div className="searchbar__imgcontainer">
          <img className='searchbar__icon' src={searchIcon}/>
        </div>
        <textarea placeholder={`Search for ${placeholder_text}`}></textarea>
      </div>
    </section>
  )
}

export default Searchbar;