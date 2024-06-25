import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);

  const addProfile = (profile) => {
    setProfiles([...profiles, profile]);
  };

  const removeProfile = (profileId) => {
    setProfiles(profiles.filter((profile) => profile.id !== profileId));
  };

  const switchProfile = (profileId) => {
    setCurrentProfile(profileId);
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        currentProfile,
        addProfile,
        removeProfile,
        switchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
