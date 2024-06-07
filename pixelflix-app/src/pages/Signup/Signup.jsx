import { useState } from 'react'
import './Signup.scss'
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    // This regex tests for characters, an @, domain name, and a domain extension
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }

  const validatePassword = () => {
    // This regex tests for 1 capital letter, 1 lowercase letter, a number, a symbol, and a length of at least 8 characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  const register = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Invalid email')
      return;
    }
    if (password === '' && repeatPassword === '') {
      alert('Passwords cannot be left empty.')
      return;
    } else if (!validatePassword()) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol, and be at least 8 characters long.')
      return;
    } else if (password !== repeatPassword) {
      alert('Passwords do not match.')
      return;
    }

    // Try and create new user in Firebase with email and password
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log('Registered new user with email: ' + email)
      navigate('/home')
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <section className='signup'>
        <div className='signup__header'>
          <img className='signup__header-logo' src='/logo.svg' />
        </div>
        <div className='signup__container'>
          <h3 className='signup__container-heading'>Sign Up</h3>
          <form className="signup__form" onSubmit={register}>
            <div className='signup__form-inputdiv'>
              <input type="email" name="email" className="signup__form-input" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" name="password" className="signup__form-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              <input type="password" name="repeatPassword" className="signup__form-input" placeholder="Repeat password" onChange={(e) => setRepeatPassword(e.target.value)} />
            </div>
           <button type="submit" className="signup__button">Create an account</button>
          </form>
          <p className='signup__container-paragraph'>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
      </section>
  )
}

export default Signup
