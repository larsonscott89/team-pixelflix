import React, { useState } from "react";
import Icon1 from "../../assets/profile-icons/icon1.svg?react";
import Icon2 from "../../assets/profile-icons/icon2.svg?react";
import Icon3 from "../../assets/profile-icons/icon3.svg?react";
import Icon4 from "../../assets/profile-icons/icon4.svg?react";
import Icon5 from "../../assets/profile-icons/icon5.svg?react";
import Icon6 from "../../assets/profile-icons/icon6.svg?react";
import "./AvatarSelection.scss";
import { db } from "../../firebase-config";
import { useAuth } from "../../context/AuthContext"
import { useProfile } from "../../context/ProfileContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const colorNameToHex = {
  red: "#FC4747",
  orange: "#FB923C",
  yellow: "#FACC15",
  green: "#80BA5E",
  blue: "#3A86FF",
  gray: "#5A698F",
  pink: "#EC6AFF",
  purple: "#A145FC",
};

const saveAvatarSelection = async (userId, profileId, iconId, color) => {
  try {
    const userDocRef = doc(db, "users", userId);

    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      console.log("No user document found at this path.");
      return;
    }

    const userDocData = userDocSnapshot.data();
    const updatedProfiles = userDocData.profiles.map(profile => {
      if (profile.id === profileId) {
        return {
          ...profile,
          avatar: iconId,
          avatarColor: colorNameToHex[color]
        };
      }
      return profile;
    });

    await updateDoc(userDocRef, {
      profiles: updatedProfiles
    });

    console.log("Avatar and color updated successfully");
  } catch (error) {
    console.error("Error updating avatar in Firestore: ", error);
  }
};


const AvatarItem = ({ icon: Icon, id, isSelected, setSelectedIcon, onClick, onColorSelect, color }) => {
  const { currentUser } = useAuth();
  const { currentProfile } = useProfile();

  const fillColor = color || "red";

  const handleCancel = () => {
    setSelectedIcon(null)
    setTimeout(() => {
      onColorSelect(null);
    }, 300);
  };

  return (
    <div className="avatar__item">
      <Icon
        className={`avatar__icon ${fillColor}`}
        onClick={() => {
          onClick(id);
        }}

      />
      <div
        className={`avatar__colorlist ${isSelected ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Select your color:</h3>
        <div className="avatar__colorlist-buttons">
          <button className="color red" onClick={() => onColorSelect("red")}></button>
          <button className="color orange" onClick={() => onColorSelect("orange")}></button>
          <button className="color yellow" onClick={() => onColorSelect("yellow")}></button>
          <button className="color green" onClick={() => onColorSelect("green")}></button>
          <button className="color blue" onClick={() => onColorSelect("blue")}></button>
          <button className="color gray" onClick={() => onColorSelect("gray")}></button>
          <button className="color pink" onClick={() => onColorSelect("pink")}></button>
          <button className="color purple" onClick={() => onColorSelect("purple")}></button>
          <button className="color custom"><p className="custom_text">+</p></button>
        </div>
        <div className="avatar__colorlist-choices">
          <button className="cancel" type="button"
          onClick={handleCancel}
          >Cancel</button>
          <button className="save" type="button" onClick={() => {
            setSelectedIcon(null)
            const selectedColor = color || "red";
            console.log(`Color ${selectedColor} saved`);

            saveAvatarSelection(currentUser.uid, currentProfile.id, id, selectedColor);

          }}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default function AvatarSelection() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [colors, setColors] = useState({
    icon1: null,
    icon2: null,
    icon3: null,
    icon4: null,
    icon5: null,
    icon6: null,
  });

  const icons = [
    { id: 'icon1', component: Icon1 },
    { id: 'icon2', component: Icon2 },
    { id: 'icon3', component: Icon3 },
    { id: 'icon4', component: Icon4 },
    { id: 'icon5', component: Icon5 },
    { id: 'icon6', component: Icon6 }
  ];

  const handleColorButtonClick = (color) => {
    setColors(prevColors => ({
      ...prevColors,
      [selectedIcon]: color
    }));
  };

  const handleIconClick = (iconId) => {
    // Set icon and close any previously opened color lists
    setSelectedIcon(prevIcon => prevIcon === iconId ? null : iconId);
  };

  return (
    <section data-testid="avatar-selection-section" className="avatar__section">
      <div className="avatar__container">
        <div className="avatar__list">
          {icons.map(({ id, component: Icon }) => (
            <AvatarItem
              key={id}
              id={id}
              icon={Icon}
              isSelected={selectedIcon === id}
              setSelectedIcon={setSelectedIcon}
              onClick={handleIconClick}
              onColorSelect={handleColorButtonClick}
              color={colors[id]} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
