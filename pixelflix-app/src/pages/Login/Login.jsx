import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import "./Login.scss";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states for validation styles
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailNonexistent, setEmailNonexistent] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);

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
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user.email + " signed in.");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setPasswordIncorrect(true);
      return;
    }
  };

  return (
    <section className="login">
      <div className="login__header">
        <img className="login__header-logo" src="/logo.svg" />
      </div>
      <div className="login__container">
        <h3 className="login__container-heading">Login</h3>
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
                className="login__form-input"
                placeholder="Email address"
                onChange={handleEmailChange}
              />
              {emailEmpty && (
                <p className="login__form-input--error">Can't be empty</p>
              )}
              {emailInvalid && (
                <p className="login__form-input--error">Invalid email</p>
              )}
              {emailNonexistent && (
                <p className="login__form-input--error">
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
                className="login__form-input"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              {passwordEmpty && (
                <p className="login__form-input--error">Can't be empty</p>
              )}
              {passwordIncorrect && (
                <p className="login__form-input--error">Password incorrect</p>
              )}
            </div>
          </div>
          <button type="submit" className="login__button">
            Login to your account
          </button>
        </form>
        <p className="login__container-paragraph">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
