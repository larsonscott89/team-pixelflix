import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/icons/logo.svg";
import HomeIcon from "../../assets/icons/icon-nav-home.svg?react";
import MovieIcon from "../../assets/icons/icon-nav-movies.svg?react";
import TvIcon from "../../assets/icons/icon-nav-tv-series.svg?react";
import BookmarkIcon from "../../assets/icons/icon-nav-bookmark.svg?react";
import profilePicture from "../../assets/images/image-avatar.png";

function Navbar() {
  const location = useLocation();

  return (
    <section className="navbar__section">
      <div className="navbar">
        <div className="navbar__imgcontainer">
          <Link to="/">
            <img className="navbar__logo" src={logo} />
          </Link>
        </div>
        <div className="navbar__page-icons">
          <div className="navbar__imgcontainer">
            <Link to="/home">
              <HomeIcon className={`navbar__icon-home ${
                  location.pathname === "/home" ? "highlight" : ""
                }`}/>
            </Link>
          </div>
          <div className="navbar__imgcontainer">
            <Link to="/movies">
              <MovieIcon className={`navbar__icon-home ${
                location.pathname === "/movies" ? "highlight" : ""
              }`}/>
            </Link>
          </div>
          <div className="navbar__imgcontainer">
            <Link to="/tv">
              <TvIcon className={`navbar__icon-home ${
                location.pathname === "/tv" ? "highlight" : ""
              }`}/>
            </Link>
          </div>
          <div className="navbar__imgcontainer">
            <Link to="/bookmarks">
              <BookmarkIcon className={`navbar__icon-home ${
                location.pathname === "/bookmarks" ? "highlight" : ""
              }`}/>
            </Link>
          </div>
        </div>
        <div className="navbar__profile-div">
          <Link to="/profile">
            <img className="navbar__profile-picture" src={profilePicture} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
