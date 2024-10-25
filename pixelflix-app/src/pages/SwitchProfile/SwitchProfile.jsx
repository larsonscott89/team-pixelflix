import React from "react";
import "./SwitchProfile.scss";
import ProfileList from "../../components/ProfileList/ProfileList";

export default function SwitchProfile() {
  return (
    <div className="content">
      <h1 className="switchProfiles__header">Switch Profile</h1>
      <div className="switchProfiles__container">
      <ProfileList />
      </div>
    </div>
  );
}
