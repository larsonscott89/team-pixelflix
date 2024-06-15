import "./Navbar.scss";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/icons/logo.svg";
import homeIcon from "../../assets/icons/icon-nav-home.svg";
import movieIcon from "../../assets/icons/icon-nav-movies.svg";
import tvIcon from "../../assets/icons/icon-nav-tv-series.svg";
import bookmarkIcon from "../../assets/icons/icon-nav-bookmark.svg";
import profilePicture from "../../assets/images/image-avatar.png";

function Navbar() {
  const location = useLocation();

  return (
    <section className="navbar">
      <div className="navbar__imgcontainer">
        <img className="navbar__logo" src={logo} />
      </div>
      <div className="navbar__page-icons">
        <div className="navbar__imgcontainer">
          <Link to="/">
            <img
              className={`navbar__icon-home ${
                location.pathname === "/" ? "highlight" : ""
              }`}
              src={homeIcon}
            />
          </Link>
        </div>
        <div className="navbar__imgcontainer">
          <Link to="/movies">
            <img
              className={`navbar__icon-movies ${
                location.pathname === "/movies" ? "highlight" : ""
              }`}
              src={movieIcon}
            />
          </Link>
        </div>
        <div className="navbar__imgcontainer">
          <Link to="/tv">
            <img
              className={`navbar__icon-tv ${
                location.pathname === "/tv" ? "highlight" : ""
              }`}
              src={tvIcon}
            />
          </Link>
        </div>
        <div className="navbar__imgcontainer">
          <Link to="/bookmarks">
            <img
              className={`navbar__icon-bookmark ${
                location.pathname === "/bookmarks" ? "highlight" : ""
              }`}
              src={bookmarkIcon}
            />
          </Link>
        </div>
      </div>
      <div className="navbar__profile-div">
        <Link to="/profile">
          <img className="navbar__profile-picture" src={profilePicture} />
        </Link>
      </div>
    </section>
  );
}

export default Navbar;
