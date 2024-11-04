import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import "./Login.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Banner from "../../components/Banner/Banner";

function Login() {
  const { currentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetEmailInput, setShowResetEmailInput] = useState(false);

  // Error states for validation styles
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailEmpty(false);
    setEmailInvalid(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordEmpty(false);
    setPasswordIncorrect(false);
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailEmpty(false);
    setEmailInvalid(false);
    
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
    }
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      setIsVerified(user.emailVerified);
      if (!user.emailVerified) {
        setLoading(false);
        setVerificationMessage("Email not verified. Please check your inbox.");
        return;
      }

      console.log(user.email + " signed in.");
      setRedirectHome(true);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setPasswordIncorrect(true);
      return;
    }
  };

  const handlePasswordReset = async () => {
    if (email === "") {
      setEmailEmpty(true);
      return;
    } else if (!validateEmail(resetEmail)) {
      setEmailInvalid(true);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setVerificationMessage("Password reset email sent! Please check your inbox.");
      setShowResetEmailInput(false);
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      setVerificationMessage("Error sending password reset email. Please try again.");
    }
  };

  const toggleResetEmailInput = () => {
    setShowResetEmailInput(true);
    setResetEmail("");
    setEmailEmpty(false);
    setEmailInvalid(false);
    setVerificationMessage("");
  };

  useEffect(() => {
    if (redirectHome && currentUser) {
      navigate("/home");
      setLoading(false);
    }
  }, [redirectHome, currentUser, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="login">
      <div className="login__header">
        <img className="login__header-logo" src="/logo.svg" alt="App Logo" />
      </div>
      <div className="login__container">
        <h3 className="login__container-heading">Login</h3>
        {verificationMessage && (
          <Banner 
            message={verificationMessage} 
            isSuccess={isVerified}
          />
        )}
        {!showResetEmailInput ? (
          <form id="login__form" className="login__form" onSubmit={handleLogin}>
            <div className="login__form-inputdiv">
              <div
                className={`login__form-input-container${
                  emailEmpty || emailInvalid ? "--error" : ""
                }`}
              >
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="login__form-input"
                  placeholder="Email address"
                  onChange={handleEmailChange}
                  aria-invalid={emailInvalid || emailEmpty ? "true" : "false"}
                  aria-describedby="email-error"
                />
                {emailEmpty && (
                  <p id="email-error" className="login__form-input--error" role="alert">Can't be empty</p>
                )}
                {emailInvalid && (
                  <p id="email-error" className="login__form-input--error" role="alert">Invalid email</p>
                )}
              </div>
              <div
                className={`login__form-input-container${
                  passwordEmpty || passwordIncorrect ? "--error" : ""
                }`}
              >
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="login__form-input"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  aria-invalid={passwordEmpty || passwordIncorrect ? "true" : "false"}
                  aria-describedby="password-error"
                />
                {passwordEmpty && (
                  <p id="password-error" className="login__form-input--error" role="alert">Can't be empty</p>
                )}
                {passwordIncorrect && (
                  <p id="password-error" className="login__form-input--error" role="alert">Password incorrect</p>
                )}
              </div>
            </div>
            <button type="submit" className="login__button">
              Login to your account
            </button>
          </form>
        ) : (
          <form className="login__form" onSubmit={(e) => { e.preventDefault(); handlePasswordReset(); }}>
            <div className="login__form-inputdiv">
              <div
                className={`login__form-input-container${emailEmpty || emailInvalid ? "--error" : ""}`}
              >
                <input
                  type="text"
                  name="resetEmail"
                  id="resetEmail"
                  className="login__form-input"
                  placeholder="Email address"
                  value={resetEmail}
                  onChange={handleResetEmailChange}
                  aria-invalid={emailEmpty || emailInvalid ? "true" : "false"}
                  aria-describedby="reset-email-error"
                />
                {emailEmpty && (
                  <p id="reset-email-error" className="login__form-input--error" role="alert">Can't be empty</p>
                )}
                {emailInvalid && (
                  <p id="reset-email-error" className="login__form-input--error" role="alert">Invalid email</p>
                )}
              </div>
            </div>
            <button type="submit" className="login__button">
              Send Password Reset Email
            </button>
            <p className="login__container-paragraph">
              <span 
              className="login__password-reset-cancel" 
              onClick={() => setShowResetEmailInput(false)}  
              role="button" 
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setShowResetEmailInput(false)}
              aria-label="Cancel password recovery"
            >
              Cancel
            </span>
            </p>
          </form>
        )}
        <p className="login__container-paragraph">
          Don't have an account? <Link to="/signup" aria-label="Go to signup page">Sign Up</Link>
        </p>
        {!showResetEmailInput && (
          <p className="login__container-paragraph login__reset-password">
            <span 
              className="login__password-reset-link" 
              onClick={toggleResetEmailInput} 
              role="button" 
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleResetEmailInput()}
              aria-label="Forgot password"
            >
              Forgot Password?
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

export default Login;
