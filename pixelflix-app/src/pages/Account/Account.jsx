import "./Account.scss"
import { signOut } from "firebase/auth"
import React, { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../../firebase-config"
import profilePicture from "../../assets/images/image-avatar.png"

export default function Account() {
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
          console.log("User data from Firestore:", JSON.stringify(data, null, 2))
          setUserInfo(data)
        } else {
          console.log("No such document!")
        }
      } else {
        console.log("No user is signed in.")
      }
    }

    fetchUserInfo()

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserInfo()
      } else {
        setUserInfo(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = () => {
    try {
      signOut(auth)
      console.log("User has successfully signed out.")
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <div className="profile-header">
        <img
          data-testid="account-picture"
          className="account-picture"
          src={profilePicture}
          alt="Profile"
        />
        </div>
        <div className="profile-btns">
        <button className="selection-btn">Update Password</button>
        <button className="selection-btn">Switch Profiles</button>
      </div>
      <div className="delete-btn">
        <button className="deleteBtn">Delete Profile</button>
      </div>
      <button className="signout-btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}