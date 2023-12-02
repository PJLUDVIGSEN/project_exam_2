import loginvideo from "../assets/loginvideo1.mp4";
import React, { useState } from 'react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginClick = () => {
    setIsRegistering(false);
    const storedPassword = localStorage.getItem(email);
    if (storedPassword && storedPassword === password) {
      // Redirect to the browse page
      window.location.href = "/browse"; // check route "/browse"
    } else {
      setErrorMessage('Incorrect email or password');
    }
  };

  const handleRegisterClick = () => {
    setErrorMessage('');
    if (isRegistering) {
      if (password === confirmPassword) {
        localStorage.setItem(email, password);
        console.log('Registration successful');
        setIsRegistering(false);
      } else {
        console.log('Passwords do not match');
      }
    } else {
      setIsRegistering(true);
    }
  };
  return (
    <div className="login">
      <video src={loginvideo} autoPlay loop muted></video>
      <section className="vh-100 gradient-custom">
        <div className="loginContainer py-5 px-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="cardLogin text-white">
                <div className="card-body p-4 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                  <svg className="loginLogo" xmlns="http://www.w3.org/2000/svg" width="107.489" height="85.991" viewBox="0 0 107.489 85.991">
                    <path id="_8542249_robot_icon" data-name="8542249_robot_icon" d="M5.374,37.621h5.374V69.868H5.374A5.368,5.368,0,0,1,0,64.494V43a5.368,5.368,0,0,1,5.374-5.374ZM91.366,29.56V75.242A10.76,10.76,0,0,1,80.617,85.991H26.872A10.76,10.76,0,0,1,16.123,75.242V29.56A13.432,13.432,0,0,1,29.56,16.123H48.37V5.374a5.374,5.374,0,0,1,10.749,0V16.123H77.93A13.432,13.432,0,0,1,91.366,29.56ZM44.339,43a6.718,6.718,0,1,0-6.718,6.718A6.718,6.718,0,0,0,44.339,43Zm32.247,0a6.718,6.718,0,1,0-6.718,6.718A6.718,6.718,0,0,0,76.586,43Zm30.9,0v21.5a5.368,5.368,0,0,1-5.374,5.374H96.74V37.621h5.374A5.368,5.368,0,0,1,107.489,43Z" transform="translate(0)" fill="#FFF"/>
                  </svg>
                  <h2 className="font-syncopate fw-bold mb-2 text-uppercase">Bits and Bots</h2>
                    <h2 className="font-syncopate fw-bold mb-2 text-uppercase">{isRegistering ? 'Register' : 'Login'}</h2>
                    <p className="font-kanit text-white-50 mb-5">Please enter your login and password!</p>

                    <div className="form-outline form-white mb-4">
                      <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <label className="form-label">Email</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <label className="form-label">Password</label>
                    </div>

                    {isRegistering && (
                      <div className="form-outline form-white mb-4">
                        <input type="password" className="form-control form-control-lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <label className="form-label">Confirm Password</label>
                      </div>
                    )}
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <button className="btn btn-outline-light btn-lg m-2 px-4" type="button" onClick={handleLoginClick}>Login</button>
                    <button className="btn btn-outline-light btn-lg m-2 px-4" type="button" onClick={handleRegisterClick}>{isRegistering ? 'Register Account' : 'Register Now'}</button>
                  </div>

                  <div>
                    <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
);
}