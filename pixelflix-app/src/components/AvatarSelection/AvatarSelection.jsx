import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Icon1 from "../../assets/profile-icons/icon1.svg?react";
import Icon2 from "../../assets/profile-icons/icon2.svg?react";
import Icon3 from "../../assets/profile-icons/icon3.svg?react";
import Icon4 from "../../assets/profile-icons/icon4.svg?react";
import Icon5 from "../../assets/profile-icons/icon5.svg?react";
import Icon6 from "../../assets/profile-icons/icon6.svg?react";
import "./AvatarSelection.scss";

const AvatarItem = ({ icon: Icon, id, isSelected, onClick, onColorSelect, color }) => {
  const navigate = useNavigate();

  return (
    <div className="avatar__item">
      <Icon
        className={`avatar__icon ${color}`}
        onClick={() => onClick(id)}
      />
      <div
        className={`avatar__colorlist ${isSelected ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to parent
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
          onClick={() => {
            setTimeout(() => onColorSelect(null), 300);
          }}
          // onClick={() => navigate('/profile')}
          >Cancel</button>
          <button className="save" type="button" onClick={() => {
            console.log('Color saved');
            navigate('/profile')
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
    // Set selected icon and close any previously opened color lists
    setSelectedIcon(prevIcon => prevIcon === iconId ? null : iconId);
  };

  return (
    <section data-testid="avatar-selection-section" className="avatar__section">
      <div className="avatar__container">
        {/* <div className="avatar__header">
          <div className="avatar__header-content">
            <h1>Choose your Avatar:</h1>
          </div>
        </div> */}
        <div className="avatar__list">
          {icons.map(({ id, component: Icon }) => (
            <AvatarItem
              key={id}
              id={id}
              icon={Icon}
              isSelected={selectedIcon === id}
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
