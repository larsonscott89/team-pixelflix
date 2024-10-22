import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import './Navbar.scss';

import logo from '../../assets/icons/logo.svg';
import HomeIcon from '../../assets/icons/icon-nav-home.svg?react';
import MovieIcon from '../../assets/icons/icon-nav-movies.svg?react';
import TvIcon from '../../assets/icons/icon-nav-tv-series.svg?react';
import BookmarkIcon from '../../assets/icons/icon-nav-bookmark.svg?react';

function Navbar() {
  const location = useLocation();

  return (
    <section data-testid="navbar-section" className="navbar__section" aria-label="Navigation Bar">
      <div className="navbar">
        <div className="navbar__imgcontainer navbar__logo-spacing">
          <Link className="navbar__link" to="/" aria-label="Home">
            <img 
              data-testid="navbar-logo" 
              className="navbar__logo" 
              src={logo} 
              alt="Logo"
            />  
          </Link>
        </div>
        <div className="navbar__page-icons" role="navigation links">
          <div className="navbar__imgcontainer navbar__icon-spacing">
            <Link className="navbar__link" to="/home" aria-label="Home">
              <HomeIcon 
                className={`navbar__icon-home ${location.pathname === "/home" ? "highlight" : ""}`} 
                data-testid="navbar-home-icon"
                aria-current={location.pathname === "/home" ? "page" : undefined}  
              />
            </Link>
          </div>
          <div className="navbar__imgcontainer navbar__icon-spacing">
            <Link className="navbar__link" to="/movies" aria-label="Movies">
              <MovieIcon 
                className={`navbar__icon-movies ${location.pathname === "/movies" ? "highlight" : ""}`} 
                data-testid="navbar-movies-icon"
                aria-current={location.pathname === "/movies" ? "page" : undefined}
              />
            </Link>
          </div>
          <div className="navbar__imgcontainer navbar__icon-spacing">
            <Link className="navbar__link" to="/tv" aria-label="TV Series">
              <TvIcon 
                className={`navbar__icon-tv ${location.pathname === "/tv" ? "highlight" : ""}`}
                data-testid="navbar-tv-icon"
                aria-current={location.pathname === "/tv" ? "page" : undefined}
              />
            </Link>
          </div>
          <div className="navbar__imgcontainer navbar__icon-spacing">
            <Link className="navbar__link" to="/bookmarks" aria-label="Bookmarks">
              <BookmarkIcon 
                className={`navbar__icon-bookmarks ${location.pathname === "/bookmarks" ? "highlight" : ""}`} 
                data-testid="navbar-bookmarks-icon"
                aria-current={location.pathname === "/bookmarks" ? "page" : undefined}
              />
            </Link>
          </div>
        </div>
        <div className="navbar__profile-div" aria-label="Profile Menu">
          <ProfileMenu />
        </div>
      </div>
    </section>
  );
}

export default Navbar;