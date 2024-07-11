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
    <section data-testid="navbar-section" className="navbar__section">
      <div className="navbar">
        <div className="navbar__imgcontainer">
          <Link to="/">
            <img data-testid="navbar-logo" className="navbar__logo" src={logo} />
          </Link>
        </div>
        <div className="navbar__page-icons">
          <div className="navbar__imgcontainer">
            <Link to="/home">
            <HomeIcon className={`navbar__icon-home ${
                  location.pathname === "/home" ? "highlight" : ""
                }`}
                data-testid="navbar-home-icon"/>
            </Link>
          </div>
          <div className="navbar__imgcontainer">
            <Link to="/movies">
            <MovieIcon className={`navbar__icon-movies ${
                  location.pathname === "/movies" ? "highlight" : ""
                }`}
                data-testid="navbar-movies-icon"
              />
            </Link>
          </div>
          <div className="navbar__imgcontainer">
            <Link to="/tv">
            <TvIcon className={`navbar__icon-tv ${
                  location.pathname === "/tv" ? "highlight" : ""
                }`}
                data-testid="navbar-tv-icon"
              />
            </Link>
          </div>
          <div className="navbar__imgcontainer">
            <Link to="/bookmarks">
            <BookmarkIcon className={`navbar__icon-bookmarks ${
                  location.pathname === "/bookmarks" ? "highlight" : ""
                }`}
                data-testid="navbar-bookmarks-icon"
              />
            </Link>
          </div>
        </div>
        <div className="navbar__profile-div">
          <Link to="/profile">
            <img data-testid="navbar-profile-picture" className="navbar__profile-picture" src={profilePicture} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
