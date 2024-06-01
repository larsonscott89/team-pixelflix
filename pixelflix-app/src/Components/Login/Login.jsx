import './Login.scss'

function Login() {

  return (
    <section className='login'>
        <div className='login__header'>
          <img className='login__header-logo' src='/logo.svg' />
        </div>
        <div className='login__container'>
          <h3 className='login__container-heading'>Login</h3>
          <form className="login__form">
            <div className='login__form-inputdiv'>
              <input type="email" id="email" className="login__form-input" placeholder="Email address" />
              <input type="password" id="password" className="login__form-input" placeholder="Password" />
            </div>
           <button type="submit" className="login__button">Login to your account</button>
          </form>
          <p className='login__container-paragraph'>Don't have an account? <a href="/signup.html">Sign Up</a></p>
        </div>
      </section>
  )
}

export default Login
