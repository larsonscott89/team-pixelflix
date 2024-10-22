import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useAuth } from "../../context/AuthContext"
import { useProfile } from "../../context/ProfileContext";
import { doc, onSnapshot } from "firebase/firestore";

import Icon1 from "../../assets/profile-icons/icon1.svg?react";
import Icon2 from "../../assets/profile-icons/icon2.svg?react";
import Icon3 from "../../assets/profile-icons/icon3.svg?react";
import Icon4 from "../../assets/profile-icons/icon4.svg?react";
import Icon5 from "../../assets/profile-icons/icon5.svg?react";
import Icon6 from "../../assets/profile-icons/icon6.svg?react";
import { IoPerson } from "react-icons/io5";

export default function AvatarDisplay({ onMouseEnter, onClick, onKeyDown }) {

  const { currentUser } = useAuth();
  const { currentProfile } = useProfile();
  const [avatarData, setAvatarData] = useState(null);

  const icons = {
    icon1: Icon1,
    icon2: Icon2,
    icon3: Icon3,
    icon4: Icon4,
    icon5: Icon5,
    icon6: Icon6,
  };

  useEffect(() => {
    if (currentUser && currentProfile) {
      const userDocRef = doc(db, "users", currentUser.uid);
      
      const fetchProfileData = onSnapshot(userDocRef, (userDocSnapshot) => {
        if (userDocSnapshot.exists()) {
          const userDocData = userDocSnapshot.data();
          const profile = userDocData.profiles.find(profile => profile.id === currentProfile.id);
          if (profile) {
            const { avatar, avatarColor } = profile;
            setAvatarData({
              iconId: avatar,
              color: avatarColor,
            });
          }
        } else {
          console.log("No such document!");
        }
      }, (error) => {
        console.error("Error fetching profile data: ", error);
      });

      return () =>  fetchProfileData();
    }
  }, [currentUser, currentProfile]);

  if (!avatarData) {
    return (
      <div 
        data-testid="navbar-profile-picture"
        className="navbar__profile-picture"
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <IoPerson
          className="placeholder-img" 
          size={"1em"}
          alt="Avatar loading image"
        />
      </div>
    );
  }

  const { iconId, color } = avatarData;
  const Icon = icons[iconId];

  return (
    <Icon 
      data-testid="navbar-profile-picture"
      className="navbar__profile-picture" 
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{ fill: color }}
      tabIndex={0}
      onKeyDown={onKeyDown}
    />
  );
};