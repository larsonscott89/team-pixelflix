import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import './Login.scss'
import { useState } from 'react';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user.email = ' signed in.')
      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className='login'>
        <div className='login__header'>
          <img className='login__header-logo' src='/logo.svg' />
        </div>
        <div className='login__container'>
          <h3 className='login__container-heading'>Login</h3>
          <form className="login__form" onSubmit={handleLogin}>
            <div className='login__form-inputdiv'>
              <input type="email" name="email" className="login__form-input" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" name="password" className="login__form-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
           <button type="submit" className="login__button">Login to your account</button>
          </form>
          <p className='login__container-paragraph'>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </section>
  )
}

export default Login
