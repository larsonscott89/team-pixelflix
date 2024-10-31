import React, { useState } from "react";
import "./AddProfileModal.scss";
import { useProfile } from "../../context/ProfileContext";
import AvatarSelection from "../AvatarSelection/AvatarSelection";
import { v4 as uuidv4 } from "uuid";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AddProfileModal({ onClose }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("icon1");
  const [avatarColor, setAvatarColor] = useState("#FC4747");

  const { addProfile, selectProfile } = useProfile();
  const navigate = useNavigate();

  const handleCreateProfile = async () => {
    const newProfile = {
      id: uuidv4(),
      name,
      avatar,
      avatarColor,
      bookmarks: [],
    };
    await addProfile(newProfile);
    selectProfile(newProfile);
    onClose();
    navigate("/");
  };

  return (
    <>
      <div className="addProfileModal__overlay" onClick={onClose}></div>
      <div className="addProfileModal">
        <IoCloseOutline
          className="addProfileModal__close-x"
          onClick={onClose}
          size={"2rem"}
        />
        <h2 className="addProfileModal__header">Add New Profile</h2>
        <input
          className="addProfileModal__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Profile Name"
        />
        <AvatarSelection
          saveData={(iconId, color) => {
            setAvatar(iconId);
            setAvatarColor(color);
          }}
        />
        <div className="addProfileModal__buttons">
          <button
            className="addProfileModal__button addProfileModal__button-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="addProfileModal__button addProfileModal__button-add"
            onClick={handleCreateProfile}
          >
            Add Profile
          </button>
        </div>
      </div>
    </>
  );
}
