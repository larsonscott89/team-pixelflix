import AvatarSelection from "../../components/AvatarSelection/AvatarSelection";
import "./ManageProfile.scss";

import { useCallback } from "react";
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

export default function Profile() {
  const { currentUser } = useAuth();
  const { currentProfile } = useProfile();

  const saveProfileAvatar = useCallback(async (iconId, color) => {
  
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
  
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        console.log("No user document found at this path.");
        return;
      }
  
      const userDocData = userDocSnapshot.data();
      const updatedProfiles = userDocData.profiles.map(profile => {
        if (profile.id === currentProfile.id) {
          return {
            ...profile,
            avatar: iconId,
            avatarColor: colorNameToHex[color] || color
          };
        }
        return profile;
      });
  
      console.log("Updating with:", {
        profiles: updatedProfiles
      });
  
      await updateDoc(userDocRef, {
        profiles: updatedProfiles
      });
  
      console.log("Avatar and color updated successfully");
    } catch (error) {
      console.error("Error updating avatar in Firestore: ", error);
    }
  }, [currentUser, currentProfile]);

  return (
    <div className="profile-content">
      <h1 className="profile-header" data-testid="profile-header">Profile Page</h1>
      <div className="selection_container">
        <AvatarSelection saveData={saveProfileAvatar} />
      </div>
    </div>
  );
}
