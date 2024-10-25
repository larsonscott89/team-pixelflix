import React, { useState } from "react";
import "./AddProfileModal.scss";
import { useProfile } from "../../context/ProfileContext";
import AvatarSelection from "../AvatarSelection/AvatarSelection";
import { IoCloseOutline } from "react-icons/io5";

export default function AddProfileModal({ onClose }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("Icon1");
  const [avatarColor, setAvatarColor] = useState("#000000");

  const { addProfile, selectProfile } = useProfile();

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
  };

  return (
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
      <AvatarSelection />
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
  );
}
