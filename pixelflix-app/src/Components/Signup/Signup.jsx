import './Signup.scss'

function Signup() {

  return (
    <section className='signup'>
        <div className='signup__header'>
          <img className='signup__header-logo' src='/logo.svg' />
        </div>
        <div className='signup__container'>
          <h3 className='signup__container-heading'>Sign Up</h3>
          <form className="signup__form">
            <div className='signup__form-inputdiv'>
              <input type="email" id="email" className="signup__form-input" placeholder="Email address" />
              <input type="password" id="password" className="signup__form-input" placeholder="Password" />
              <input type="password" id="repeat-password" className="signup__form-input" placeholder="Repeat password" />
            </div>
           <button type="submit" className="signup__button">Create an account</button>
          </form>
          <p className='signup__container-paragraph'>Already have an account? <a href="/login.jsx">Login</a></p>
        </div>
  
      </section>
  )
}

export default Signup
