import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentProfileIndex, setCurrentProfileIndex] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentProfile) {
      const profileIndex = currentProfile.id - 1;
      setCurrentProfileIndex(profileIndex);
    }
  }, [currentProfile]);

  useEffect(() => {
    if (currentUser) {
      const userProfiles = currentUser.profiles || [];
      setProfiles(userProfiles);
      setCurrentProfile(userProfiles[0]);
    } else {
      setProfiles([]);
      setCurrentProfile(null);
    }
    setLoading(false);
  }, [currentUser]);

  const selectProfile = (profile) => {
    setCurrentProfile(profile);
  };

  const toggleBookmark = async (video) => {
    if (currentProfile) {
      const isBookmarked = currentProfile.bookmarks.some(
        (bookmark) => bookmark.id === video.id
      );

      const updatedBookmarks = isBookmarked
        ? currentProfile.bookmarks.filter(
            (bookmark) => bookmark.id !== video.id
          )
        : [...currentProfile.bookmarks, video];

      const updatedProfile = {
        ...currentProfile,
        bookmarks: updatedBookmarks,
      };

      setCurrentProfile(updatedProfile);

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userDocData = userDocSnapshot.data();

        if (!userDocSnapshot.exists()) {
          console.log("No user document found at this path.");
          return;
        }

        const updatedProfiles = userDocData.profiles.map((profile, index) =>
          index === currentProfileIndex ? updatedProfile : profile
        );

        await updateDoc(userDocRef, {
          profiles: updatedProfiles,
        });
      } catch (err) {
        console.error("Error updating bookmarks in Firestore: ", err);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const value = {
    profiles,
    currentProfile,
    selectProfile,
    toggleBookmark,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
