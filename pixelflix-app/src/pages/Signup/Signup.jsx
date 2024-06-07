import { useState } from "react";
import "./Signup.scss";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
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
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered new user with email: " + email);
      navigate("/home");
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <section className="signup">
      <div className="signup__header">
        <img className="signup__header-logo" src="/logo.svg" />
      </div>
      <div className="signup__container">
        <h3 className="signup__container-heading">Sign Up</h3>
        <form className="signup__form" onSubmit={register}>
          <div className="signup__form-inputdiv">
            <div
              className={`signup__form-input-container${
                emailEmpty || emailInvalid ? "--error" : ""
              }`}
            >
              <input
                type="text"
                name="email"
                className="signup__form-input"
                placeholder="Email address"
                onChange={handleEmailChange}
              />
              {emailEmpty && (
                <p className="signup__form-input--error">Can't be empty</p>
              )}
              {emailInvalid && (
                <p className="signup__form-input--error">Invalid email</p>
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
                className="signup__form-input"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              {passwordEmpty && (
                <p className="signup__form-input--error">Can't be empty</p>
              )}
              {passwordWeak && (
                <p className="signup__form-input--error">Too weak</p>
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
                className="signup__form-input"
                placeholder="Repeat password"
                onChange={handleRepeatPasswordChange}
              />
              {repeatPasswordEmpty && (
                <p className="signup__form-input--error">Can't be empty</p>
              )}
              {repeatPasswordNotMatch && (
                <p className="signup__form-input--error">
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
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
