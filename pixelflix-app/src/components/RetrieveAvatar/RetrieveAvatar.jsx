import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useAuth } from "../../context/AuthContext"
import { useProfile } from "../../context/ProfileContext";
import { doc, getDoc } from "firebase/firestore";

import Icon1 from "../../assets/profile-icons/icon1.svg?react";
import Icon2 from "../../assets/profile-icons/icon2.svg?react";
import Icon3 from "../../assets/profile-icons/icon3.svg?react";
import Icon4 from "../../assets/profile-icons/icon4.svg?react";
import Icon5 from "../../assets/profile-icons/icon5.svg?react";
import Icon6 from "../../assets/profile-icons/icon6.svg?react";
import { IoPerson } from "react-icons/io5";

export default function AvatarDisplay({ testid, className, onMouseEnter, onClick }) {
  // console.log({ testid, className, onMouseEnter, onClick });

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
      const fetchProfileData = async () => {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);

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
          }
        } catch (error) {
          console.error("Error fetching profile data: ", error);
        }
      };

      fetchProfileData();
    }
  }, [currentUser, currentProfile]);

  if (!avatarData) {
    return (
      <IoPerson
        data-testid={testid}
        className={className} 
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        alt="Avatar loading image"/>
    );
  }

  console.log(avatarData);
  const { iconId, color } = avatarData;
  const Icon = icons[iconId];

  return (
    <Icon 
      data-testid={testid}
      className={className} 
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{ fill: color }}
    />
  );
};