import "./ProfileList.scss";
import { useProfile } from "../../context/ProfileContext"
import Avatar from "../Avatar/Avatar";
import { IoAddOutline } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import AddProfileModal from "../AddProfileModal/AddProfileModal";
import { useState } from "react";

export default function ProfileList() {
  const { profiles } = useProfile();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const handleRemoveProfile = async (profile) => {
    await removeProfile(profile);
    setProfiles(profiles.filter((p) => p.id !== profile.id));
  };

  return (
    <div className='profileList'>
      {profiles.map((profile) => {
        return (
          <div key={profile.id} className='profileList__card'>
          <Avatar avatarId={profile.avatar} avatarColor={profile.avatarColor} />
          <p className="profileList__card-text">{profile.name}</p>
        </div>
        )
      })}
      {profiles.length < 6 && (
        <div className='profileList__card add-profile' onClick={handleOpenModal}>
          <IoAddOutline className="profileList__card-icon" size={"3rem"}  />
          <p className="profileList__card-text">Add Profile</p>
        </div>
      ) }
      {modalOpen && (
        <AddProfileModal onClose={handleCloseModal} />
      )}
    </div>
  )
}
