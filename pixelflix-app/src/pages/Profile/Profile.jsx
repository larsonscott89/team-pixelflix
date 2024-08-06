import "./Profile.scss"
import { signOut } from "firebase/auth"
import React, { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../../firebase-config"
import profilePicture from "../../assets/images/image-avatar.png"

export default function Profile() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser
      if (user) {
        const userDocRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          const data = userDoc.data()
          setUserInfo(data)
        } else {
          console.log("No such document!")
        }
      } else {
        console.log("No user is signed in.")
      }
    }

    fetchUserInfo()
  }, [])

  return (
    <div className="account-content">
      <div className="profile-header">
        <img
          data-testid="account-picture"
          className="account-picture"
          src={profilePicture}
          alt="Profile"
        />
        <div className="profile-info">
          <h1 className="profile-username"> Profile Name </h1>
          <p className="profile-name">
            {userInfo ? userInfo.profiles[0]?.name : "Loading user information..."}
          </p>
        </div>
      </div>
    </div>
  )
}