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
              <div className="cardLogin bg-dark text-white">
                <div className="card-body p-4 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">{isRegistering ? 'Register' : 'Login'}</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

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