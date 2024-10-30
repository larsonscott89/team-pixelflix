import "./Account.scss"
import { FaEnvelope, FaLock, FaCreditCard, FaSignOutAlt, FaTrash } from 'react-icons/fa'
import ThinChevronRight from '../../components/ThinChevronRight/ThinChevronRight'
import { EmailAuthProvider, reauthenticateWithCredential, signOut, updatePassword } from "firebase/auth"
import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase-config"

import { useAuth } from "../../context/AuthContext"
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function Account() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const passwordInputRef = useRef(null);
  const modalRef = useRef(null);

  const [currentPasswordEmpty, setCurrentPasswordEmpty] = useState(false);
  const [newPasswordEmpty, setNewPasswordEmpty] = useState(false);
  const [newPasswordWeak, setNewPasswordWeak] = useState(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
  const [confirmPasswordNotMatch, setConfirmPasswordNotMatch] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (currentUser) {
        setUserEmail(currentUser.email)
      } else {
        console.log("No user is signed in.")
      }
    }

    fetchUserEmail()

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
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

  const validatePassword = (password) => {
    // This regex tests for 1 capital letter, 1 lowercase letter, a number, a symbol, and a length of at least 8 characters
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordEmpty(false);
    setNewPasswordWeak(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordEmpty(false);
    setConfirmPasswordNotMatch(false);
  };
  
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (auth.currentUser) {
      if (currentPassword === "") {
        setCurrentPasswordEmpty(true);
        return;
      } else if (newPassword === "") {
        setNewPasswordEmpty(true);
        return;
      } else if (!validatePassword(newPassword)) {
        setNewPasswordWeak(true);
        alert(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol, and be at least 8 characters long."
        );
        return;
      } else if (confirmPassword === "") {
        setConfirmPasswordEmpty(true);
        return;
      } else if (newPassword !== confirmPassword) {
        setConfirmPasswordNotMatch(true);
        return;
      }
      
      try {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          currentPassword
        );

        await reauthenticateWithCredential(auth.currentUser, credential);

        await updatePassword(auth.currentUser, newPassword);
        setUpdateMessage("Password updated successfully.");
        setPasswordUpdateSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          alert("Old password is incorrect. Please try again.");
        } else {
          setUpdateMessage("Error updating password: " + error.message);
          console.error("Error updating password:", error);
        }
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!modalRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll('input, button, [tabindex]:not([tabindex="-1"])');

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
  
      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
  
      if (event.key === "Escape") {
        closeModal();
      }
    };
  
    if (showPasswordModal) {
      const focusTimeout = setTimeout(() => {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus();
        }
      }, 0);
  
      document.addEventListener("keydown", handleKeyDown);
  
      return () => {
        clearTimeout(focusTimeout);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [showPasswordModal]);

  const closeModal = () => {
    setShowPasswordModal(false);
    setUpdateMessage("");
    setPasswordUpdateSuccess(false);
};

  return (
    <div>
      <h1 className="account__heading"> Account </h1>
      <div className="account__container">
        <div className="account__info">
          <button
            className="account__info-row email-box" 
            aria-label="Email box"
            role="button"
          >
            <FaEnvelope /> 
            <span>Email</span>
            <p>{userEmail}</p>
          </button>
          <button 
            className="account__info-row password-btn"
            onClick={() => setShowPasswordModal(true)}
            aria-label="Update password"
            role="button"
          >
            <FaLock /> 
            <span>Update Password</span>
            <div className="arrow-icon">
              <ThinChevronRight size={32} thickness={1} color="white"/>
            </div>
          </button>
          <button 
            className="account__info-row manage-btn"
            aria-label="Manage subscription"
            role="button"
          >
            <FaCreditCard /> 
            <span>Manage Subscription</span>
            <div className="arrow-icon">
              <ThinChevronRight size={32} thickness={1} color="white"/>
            </div>
          </button>
          <button 
            className="account__info-row signout-btn" 
            onClick={handleSignOut}
            aria-label="Sign out"
            role="button"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
            <div className="arrow-icon">
              <ThinChevronRight size={32} thickness={1} color="white"/>
            </div>
          </button>
          <button 
            className="delete-btn"
            aria-label="Delete Account" 
            role="button"
          >
            <FaTrash />
            <span>Delete Account</span>
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true" ref={modalRef}>
          <div className="modal-content">
            {!passwordUpdateSuccess && (
              <div>
                <h2 id="modal-title">Update Password</h2>
                <form id="password__form" onSubmit={handleUpdatePassword}>
                  <div className="modal__form-inputdiv">
                  <div className={`modal__form-input-container${currentPasswordEmpty ? "--error" : ""}`}>
                    <input 
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      ref={passwordInputRef}
                      placeholder="Enter your current password"
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                        setCurrentPasswordEmpty(false);
                      }}
                      aria-invalid={currentPasswordEmpty ? "true" : "false"}
                      aria-describedby="currentPassword-error"
                    />
                    {currentPasswordEmpty && (
                      <p id="currentPassword-error" className="modal__form-input--error" role="alert">Can't be empty</p>
                    )}
                  </div>

                    <div className={`modal__form-input-container${newPasswordEmpty || newPasswordWeak ? "--error" : ""}`}>
                      <input 
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        aria-invalid={newPasswordEmpty || newPasswordWeak ? "true" : "false"}
                        aria-describedby="newPassword-error"
                      />
                      {newPasswordEmpty && (
                        <p id="newPassword-error" className="modal__form-input--error" role="alert">Can't be empty</p>
                      )}
                      {newPasswordWeak && (
                        <p id="newPassword-error" className="modal__form-input--error" role="alert">Too weak</p>
                      )}
                    </div>
                  
                    <div className={`modal__form-input-container${confirmPasswordEmpty || confirmPasswordNotMatch ? "--error" : ""}`}>
                      <input 
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        onChange={handleConfirmPasswordChange}
                        aria-invalid={confirmPasswordEmpty || confirmPasswordNotMatch ? "true" : "false"}
                        aria-describedby="confirmPassword-error"
                      />
                      {confirmPasswordEmpty && (
                        <p id="confirmPassword-error" className="modal__form-input--error" role="alert">Can't be empty</p>
                      )}
                      {confirmPasswordNotMatch && (
                        <p id="confirmPassword-error" className="modal__form-input--error" role="alert">
                          Passwords don't match
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {updateMessage && <p className="update-message" role="alert">{updateMessage}</p>}
                  
                  <div className="button-container">
                    <button type="submit" className="Update-Password__button">
                      Update
                    </button>
                    <button type="button" className="cancel__button" onClick={closeModal}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
            {passwordUpdateSuccess && (
              <div>
                <h2 id="modal-title">Password Sucessfully Updated!</h2>
                <IoCheckmarkCircleOutline size={"8rem"} color="#28A745" />
                <div className="button-container">
                  <button className="close__button" onClick={closeModal}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}     