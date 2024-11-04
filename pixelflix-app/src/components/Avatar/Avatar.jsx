import "./Avatar.scss";
import Icon1 from "../../assets/profile-icons/icon1.svg?react";
import Icon2 from "../../assets/profile-icons/icon2.svg?react";
import Icon3 from "../../assets/profile-icons/icon3.svg?react";
import Icon4 from "../../assets/profile-icons/icon4.svg?react";
import Icon5 from "../../assets/profile-icons/icon5.svg?react";
import Icon6 from "../../assets/profile-icons/icon6.svg?react";

export default function Avatar({ avatarId, avatarColor }) {
  const icons = {
    icon1: Icon1,
    icon2: Icon2,
    icon3: Icon3,
    icon4: Icon4,
    icon5: Icon5,
    icon6: Icon6,
  };

  const Icon = icons[avatarId];

  return (
    <Icon 
      style={{ fill: avatarColor }} 
      className="profile-avatar" 
    />
  )
}
