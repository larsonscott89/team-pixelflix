import { useCallback, useState } from "react";
import { db } from "../../firebase-config";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import Avatar from "../../components/Avatar/Avatar";
import AvatarSelection from "../../components/AvatarSelection/AvatarSelection";
import { FiEdit } from "react-icons/fi";
import "./ManageProfile.scss";
import { useNavigate } from "react-router-dom";

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

export default function Profile() {
  const { currentUser } = useAuth();
  const { currentProfile, setCurrentProfile } = useProfile();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false); 
  const [newName, setNewName] = useState(currentProfile.name); 

  const avatarId = currentProfile.avatar;
  const avatarColor = currentProfile.avatarColor;

  const saveProfileAvatar = useCallback(async (iconId, color) => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) return;

      const userDocData = userDocSnapshot.data();
      const updatedProfiles = userDocData.profiles.map(profile => {
        if (profile.id === currentProfile.id) {
          return {
            ...profile,
            avatar: iconId,
            avatarColor: colorNameToHex[color] || color,
          };
        }
        return profile;
      });
      
      await updateDoc(userDocRef, { profiles: updatedProfiles });
      setCurrentProfile(updatedProfiles.find(profile => profile.id === currentProfile.id));
    } catch (error) {
      console.error("Error updating avatar in Firestore: ", error);
    }
  }, [currentUser, currentProfile, setCurrentProfile])

  const handleDeleteProfile = async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) return;

      const updatedProfiles = userDocSnapshot
        .data()
        .profiles.filter(profile => profile.id !== currentProfile.id);

      await updateDoc(userDocRef, { profiles: updatedProfiles });
      navigate("/switch-profile");
    } catch (error) {
      console.error("Error deleting profile:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const saveProfileName = useCallback(async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) return

      const userDocData = userDocSnapshot.data();
      const updatedProfiles = userDocData.profiles.map(profile => {
        if (profile.id === currentProfile.id) {
          return { ...profile, name: newName };
        }
        return profile;
      });

      await updateDoc(userDocRef, { profiles: updatedProfiles });
      setCurrentProfile(updatedProfiles.find(profile => profile.id === currentProfile.id));
      setIsEditingName(false);
    } catch (error) {
      console.error("Error updating profile name in Firestore: ", error);
    }
  }, [currentUser, currentProfile, newName, setCurrentProfile]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveProfileName();
    }
  };

  return (
    <div className="profile-page">
      <h1 className="profile-header">Profile</h1>
      <div className="profile-avatar-container">
        <Avatar
          avatarId={currentProfile.avatar}
          avatarColor={currentProfile.avatarColor}
        />
      </div>
      <div className="profile-content">
        <label className="profile-name-label">Profile name</label>
        <div className="profile-name-container">
          {isEditingName ? (
            <div className="edit-name-container">
              <input
                className="profile-name-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={saveProfileName} className="save-btn">Save</button>
              <button onClick={() => setIsEditingName(false)} className="cancel-btn">Cancel</button>
            </div>
          ) : (
            <div className="display-name-container">
              <span className="profile-name">{newName}</span>
              <FiEdit onClick={() => setIsEditingName(true)} className="edit-icon" />
            </div>
          )}
        </div>
        <div className="selection_container">
          <AvatarSelection saveData={saveProfileAvatar} />
        </div>

        {/* Delete Profile Button */}
        <div className="delete-btn-container">
          <button
            className="delete-btn"
            onClick={() => setShowDeleteModal(true)}
          >
            <span>Delete Profile</span>
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="delete-modal">
            <div className="delete-modal-content">
              <h2>Are you sure you want to delete this profile?</h2>
              <p>This action is irreversible.</p>
              <div className="delete-modal__buttons">
                <button
                  className="delete-modal__button confirm-delete-btn"
                  onClick={handleDeleteProfile}
                >
                  Yes, I'm sure
                </button>
                <button
                  className="delete-modal__button cancel-delete-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}