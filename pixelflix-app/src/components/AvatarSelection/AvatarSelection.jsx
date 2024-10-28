import React, { useState } from "react";
import Icon1 from "../../assets/profile-icons/icon1.svg?react";
import Icon2 from "../../assets/profile-icons/icon2.svg?react";
import Icon3 from "../../assets/profile-icons/icon3.svg?react";
import Icon4 from "../../assets/profile-icons/icon4.svg?react";
import Icon5 from "../../assets/profile-icons/icon5.svg?react";
import Icon6 from "../../assets/profile-icons/icon6.svg?react";
import "./AvatarSelection.scss";

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

const AvatarItem = ({ icon: Icon, id, isSelected, setSelectedIcon, onClick, onColorSelect, color, saveData }) => {

  const [customColor, setCustomColor] = useState(null);

  const fillColor = color || "red";

  const handleCancel = () => {
    setSelectedIcon(null);
    setCustomColor(null);
    setTimeout(() => {
      onColorSelect(null);
    }, 300);
  };

  return (
    <div className="avatar__item" aria-label={`Select avatar ${id}`} aria-expanded={isSelected}>
      <Icon
        className={"avatar__icon"}
        style={{ fill: colorNameToHex[fillColor] || fillColor }}
        onClick={() => {
          onClick(id);
          setCustomColor(null);
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onClick(id);
            setCustomColor(null);
          }
        }}
      />
      <div
        className={`avatar__colorlist ${isSelected ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby={`colorlist-${id}`}
      >
        <h3 id={`colorlist-${id}`}>Select your color:</h3>
        <div className="avatar__colorlist-buttons">
          {Object.keys(colorNameToHex).map(colorName => (
            <button
              key={colorName}
              className={"color"}
              style={{ backgroundColor: colorNameToHex[colorName] }}
              onClick={() => onColorSelect(colorName)}
              aria-label={`Select ${colorName} color`}
              tabIndex={isSelected ? 0 : -1}
            ></button>
          ))}
          <button 
            className="color custom" 
            aria-label="Custom color" 
            tabIndex={isSelected ? 0 : -1}
            onClick={() => setCustomColor(prev => (prev === id ? null : id))} 
          > 
            <p className="custom_text">+</p>
            
            <input
              type="color"
              onChange={(e) => onColorSelect(e.target.value)}
              aria-label="Choose custom color"
              className="color-picker-input"
            />
          </button>
        </div>

        <div className="avatar__colorlist-choices">
          <button 
            className="cancel" 
            type="button"
            onClick={handleCancel}
            aria-label="Cancel color selection"
            tabIndex={isSelected ? 0 : -1}
          >Cancel</button>
          <button 
            className="save" 
            type="button" 
            aria-label="Save color selection"
            tabIndex={isSelected ? 0 : -1}
            onClick={() => {
              setSelectedIcon(null)
              const selectedColor = customColor === id ? color : color || fillColor;

              saveData(id, selectedColor);
              console.log(`Color ${selectedColor} saved`);
            }}
          >Save</button>
        </div>
      </div>
    </div>
  );
};

export default function AvatarSelection({ saveData }) {
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
    <section data-testid="avatar-selection-section" className="avatar__section" aria-label="Avatar Selection">
      <div className="avatar__container">
        <div className="avatar__list" role="list">
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
              saveData={saveData}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
