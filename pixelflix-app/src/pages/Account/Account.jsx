import "./Account.scss"
import { FaEnvelope, FaLock, FaCreditCard, FaSignOutAlt, FaTrash } from 'react-icons/fa'
import ThinChevronRight from '../../components/ThinChevronRight/ThinChevronRight'
import { signOut } from "firebase/auth"
import React, { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../../firebase-config"

export default function Account() {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const fetchUserEmail = async () => {
      const user = auth.currentUser
      if (user) {
        const userDocRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          setUserEmail(user.email)
        } else {
          console.log("No such document!")
        }
      } else {
        console.log("No user is signed in.")
      }
    }

    fetchUserEmail()

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserEmail()
      } else {
        setUserEmail("")
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
      <h1 className="account__heading"> Account </h1>
      <div className="account__container">
        <div className="account__info">
          <div className="account__info-row email-box">
            <FaEnvelope /> 
            <span>Email</span>
            <p>{userEmail}</p>
          </div>
          <button className="account__info-row password-btn">
            <FaLock /> 
            <span>Update Password</span>
            <div className="arrow-icon">
              <ThinChevronRight size={32} thickness={1} color="white"/>
            </div>
          </button>
          <button className="account__info-row manage-btn">
            <FaCreditCard /> 
            <span>Manage Subscription</span>
            <div className="arrow-icon">
              <ThinChevronRight size={32} thickness={1} color="white"/>
            </div>
          </button>
          <button className="account__info-row signout-btn" onClick={handleSignOut}>
            <FaSignOutAlt />
            <span>Sign Out</span>
            <div className="arrow-icon">
              <ThinChevronRight size={32} thickness={1} color="white"/>
            </div>
          </button>
          <button className="delete-btn">
            <FaTrash />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  )
}