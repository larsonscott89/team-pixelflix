import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase-config";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentProfileIndex, setCurrentProfileIndex] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentProfile) {
      const profileIndex = currentProfile.id - 1;
      setCurrentProfileIndex(profileIndex);
    }
  }, [currentProfile]);

  useEffect(() => {
    if (currentUser) {
      const savedProfileId = localStorage.getItem("selectedProfileId");
      const userProfiles = currentUser.profiles || [];
      const savedProfile = userProfiles.find((p) => p.id === savedProfileId);
      setProfiles(userProfiles);
      setCurrentProfile(savedProfile || userProfiles[0]);
    } else {
      setProfiles([]);
      setCurrentProfile(null);
    }
    setLoading(false);
  }, [currentUser]);

  const selectProfile = (profile) => {
    setCurrentProfile(profile);
    localStorage.setItem("selectedProfileId", profile.id);
    navigate("/");
  };

  const addProfile = async (newProfile) => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        profiles: arrayUnion(newProfile),
      });
    } catch (err) {
      console.error("Error adding new profile: ", err);
    }
  };

  const toggleBookmark = async (video) => {
    if (currentProfile) {
      console.log(currentProfile);

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

        const updatedProfiles = userDocData.profiles.map((profile) =>
          profile.id === currentProfile.id ? updatedProfile : profile
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
    setProfiles,
    currentProfile,
    selectProfile,
    addProfile,
    toggleBookmark,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
