import { useEffect, useState } from "react";
import "./Signup.scss";
import { auth, db } from "../../firebase-config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import Banner from "../../components/Banner/Banner";

function Signup() {
  const { currentUser } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // Error states for validation styles
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordWeak, setPasswordWeak] = useState(false);
  const [repeatPasswordEmpty, setRepeatPasswordEmpty] = useState(false);
  const [repeatPasswordNotMatch, setRepeatPasswordNotMatch] = useState(false);

  const [redirectHome, setRedirectHome] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailEmpty(false);
    setEmailInvalid(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordEmpty(false);
    setPasswordWeak(false);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    setRepeatPasswordEmpty(false);
    setRepeatPasswordNotMatch(false);
  };

  const timeout = (delay) => new Promise(res => setTimeout(res, delay));

  const validateEmail = (email) => {
    // This regex tests for characters, an @, domain name, and a domain extension
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    // This regex tests for 1 capital letter, 1 lowercase letter, a number, a symbol, and a length of at least 8 characters
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const register = async (e) => {
    e.preventDefault();
    if (email === "") {
      setEmailEmpty(true);
      return;
    } else if (!validateEmail(email)) {
      setEmailInvalid(true);
      return;
    }

    if (password === "") {
      setPasswordEmpty(true);
      return;
    } else if (!validatePassword()) {
      setPasswordWeak(true);
      alert(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol, and be at least 8 characters long."
      );
      return;
    } else if (repeatPassword === "") {
      setRepeatPasswordEmpty(true);
      return;
    } else if (password !== repeatPassword) {
      setRepeatPasswordNotMatch(true);
      return;
    }

    // Try and create new user in Firebase with email and password
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      setVerificationMessage("Email sent to " + email);
      setIsVerified(false);

      // Create user object for newly registered user in Firestore
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, {
        email: user.email,
        profiles: [
          {
            id: 1,
            name: "",
            avatar: "icon1",
            avatarColor: "#FC4747",
            bookmarks: [],
          },
        ],
        createdAt: new Date(),
      });
      
      //prevents too many calls to backend if user takes a long time to verify
      for (let i = 0; !user.emailVerified; i++) {
        await user.reload();
        if (i > 12) {
          await timeout(30000);
        } else {
          await timeout(3000);
        }
      }

      if (user.emailVerified) {
        setVerificationMessage("Email Verified");
        setIsVerified(true);
        setTimeout(function() {
          setRedirectHome(true);
        }, 5000);
      }

    } catch (err) {
      setLoading(false);
      console.error(err);
      return;
    }
  };

  useEffect(() => {
    if (redirectHome && currentUser) {
      navigate("/home");
      setLoading(false);
    }
  }, [redirectHome, currentUser, navigate]);

  return (
    <section className="signup">
      <div className="signup__header">
        <img className="signup__header-logo" src="/logo.svg" alt="App Logo"/>
      </div>
      <div className="signup__container">
        <h3 className="signup__container-heading">Sign Up</h3>
        {verificationMessage && (
          <Banner 
            message={verificationMessage} 
            isSuccess={isVerified} 
          />
        )}
        <form id="signup__form" className="signup__form" onSubmit={register}>
          <div className="signup__form-inputdiv">
            <div
              className={`signup__form-input-container${
                emailEmpty || emailInvalid ? "--error" : ""
              }`}
            >
              <input
                type="text"
                name="email"
                id="email"
                className="signup__form-input"
                placeholder="Email address"
                onChange={handleEmailChange}
                aria-invalid={emailInvalid || emailEmpty ? "true" : "false"}
                aria-describedby="email-error"
              />
              {emailEmpty && (
                <p id="email-error" className="signup__form-input--error" role="alert">Can't be empty</p>
              )}
              {emailInvalid && (
                <p id="email-error" className="signup__form-input--error" role="alert">Invalid email</p>
              )}
            </div>
            <div
              className={`signup__form-input-container${
                passwordEmpty || passwordWeak || repeatPasswordNotMatch
                  ? "--error"
                  : ""
              }`}
            >
              <input
                type="password"
                name="password"
                id="password"
                className="signup__form-input"
                placeholder="Password"
                onChange={handlePasswordChange}
                aria-invalid={passwordEmpty || passwordWeak ? "true" : "false"}
                aria-describedby="password-error"
              />
              {passwordEmpty && (
                <p id="password-error" className="signup__form-input--error" role="alert">Can't be empty</p>
              )}
              {passwordWeak && (
                <p id="password-error" className="signup__form-input--error" role="alert">Too weak</p>
              )}
            </div>
            <div
              className={`signup__form-input-container${
                repeatPasswordEmpty || repeatPasswordNotMatch ? "--error" : ""
              }`}
            >
              <input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                className="signup__form-input"
                placeholder="Repeat password"
                onChange={handleRepeatPasswordChange}
                aria-invalid={repeatPasswordEmpty || repeatPasswordNotMatch ? "true" : "false"}
                aria-describedby="repeatPassword-error"
              />
              {repeatPasswordEmpty && (
                <p id="repeatPassword-error" className="signup__form-input--error" role="alert">Can't be empty</p>
              )}
              {repeatPasswordNotMatch && (
                <p id="repeatPassword-error" className="signup__form-input--error" role="alert">
                  Passwords don't match
                </p>
              )}
            </div>
          </div>
          <button type="submit" className="signup__button">
            Create an account
          </button>
        </form>
        <p className="signup__container-paragraph">
          Already have an account? <Link to={"/login"} aria-label="Go to login page">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
