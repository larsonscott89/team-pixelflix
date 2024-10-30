import AvatarSelection from "../../components/AvatarSelection/AvatarSelection";
import "./ManageProfile.scss";

export default function Profile() {
  
  return (
    <div className="profile-content">
      <h1 className="profile-header" data-testid="profile-header">Profile Page</h1>
      <div className="selection_container">
        <AvatarSelection/>
      </div>
    </div>
  );
}
