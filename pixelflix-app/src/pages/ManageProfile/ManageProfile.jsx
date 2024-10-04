import AvatarSelection from "../../components/AvatarSelection/AvatarSelection";
import "./ManageProfile.scss";

export default function Profile() {
  
  return (
    <div className="content">
      <h1 data-testid="profile-header">Profile Page</h1>
      <div className="selection_container">
        <AvatarSelection/>
      </div>
    </div>
  );
}
