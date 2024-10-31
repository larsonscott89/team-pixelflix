import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import "./Login.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import VerificationBanner from "../../components/VerificationBanner/VerificationBanner";

function Login() {
  const { currentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states for validation styles
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailNonexistent, setEmailNonexistent] = useState(false);
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
    setEmailNonexistent(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordEmpty(false);
    setPasswordIncorrect(false);
  };

  const validateEmail = (email) => {
    // This regex tests for characters, an @, domain name, and a domain extension
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
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
    }
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      setIsVerified(user.emailVerified);
      if (!user.emailVerified) {
        setLoading(false);
        setVerificationMessage("Email not verified. Please check your inbox.")
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
        <img className="login__header-logo" src="/logo.svg" alt="App Logo"/>
      </div>
      <div className="login__container">
        <h3 className="login__container-heading">Login</h3>
        {verificationMessage && <VerificationBanner message={verificationMessage} isVerified={isVerified} />}
        <form className="login__form" onSubmit={handleLogin}>
          <div className="login__form-inputdiv">
            <div
              className={`login__form-input-container${
                emailEmpty || emailInvalid || emailNonexistent ? "--error" : ""
              }`}
            >
              <input
                type="text"
                name="email"
                id="email"
                className="login__form-input"
                placeholder="Email address"
                onChange={handleEmailChange}
                aria-invalid={emailInvalid || emailEmpty || emailNonexistent ? "true" : "false"}
                aria-describedby="email-error"
              />
              {emailEmpty && (
                <p id="email-error" className="login__form-input--error" role="alert">Can't be empty</p>
              )}
              {emailInvalid && (
                <p id="email-error" className="login__form-input--error" role="alert">Invalid email</p>
              )}
              {emailNonexistent && (
                <p id="email-error" className="login__form-input--error" role="alert">
                  No account with this email
                </p>
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
        <p className="login__container-paragraph">
          Don't have an account? <Link to="/signup" aria-label="Go to signup page">Sign Up</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
