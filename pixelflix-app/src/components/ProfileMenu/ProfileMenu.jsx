import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AvatarDisplay from '../RetrieveAvatar/RetrieveAvatar';
import './ProfileMenu.scss';

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div className="profile-menu">
      <AvatarDisplay
        onMouseEnter={handleMouseEnter}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div 
          className="profile-menu__options"
          aria-label="Profile Options"
          role="menu"
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/account" className="profile-menu__option" role="menu item">Account</Link>
          <Link to="/manage-profile" className="profile-menu__option" role="menu item">Manage Profile</Link>
          <Link to="/switch-profile" className="profile-menu__option" role="menu item">Switch Profile</Link>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;