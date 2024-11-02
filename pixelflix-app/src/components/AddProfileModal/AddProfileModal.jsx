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
  const [noNameErrorMessage, setNoNameErrorMessage] = useState(false);

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
    try {
      if (name !== "") {
        await addProfile(newProfile);
        selectProfile(newProfile);
        onClose();
        navigate("/");
      } else {
        setNoNameErrorMessage(true);
      }
    } catch (err) {
      console.error(err);
    }
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
          className={`addProfileModal__input ${
            noNameErrorMessage ? "addProfileModal__error-outline" : ""
          }`}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (noNameErrorMessage) setNoNameErrorMessage(false);
          }}
          placeholder="Profile Name"
        />
        {noNameErrorMessage && (
          <p className="addProfileModal__error-message">
            Please add a profile name.
          </p>
        )}

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
