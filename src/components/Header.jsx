import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react";

export function Header() {
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate(); // useNavigate hook for navigation
    useEffect(() => {
        // Count number of items in cart
        const updateCartCount = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartCount(storedCart.length);
        };

        // Call the function to reset
        updateCartCount();

        // Add event listener cartcount
        window.addEventListener('cartUpdated', updateCartCount);

        // Cleanup
        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

    const handleLogout = () => {
      localStorage.clear(); // Clear all localStorage data
      navigate('/'); // Redirect to landing page
  };
    return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="storeLogo m-2" to="/browse">
        <svg className="storeLogo" xmlns="http://www.w3.org/2000/svg" width="107.489" height="85.991" viewBox="0 0 107.489 85.991">
          <path id="_8542249_robot_icon" data-name="8542249_robot_icon" d="M5.374,37.621h5.374V69.868H5.374A5.368,5.368,0,0,1,0,64.494V43a5.368,5.368,0,0,1,5.374-5.374ZM91.366,29.56V75.242A10.76,10.76,0,0,1,80.617,85.991H26.872A10.76,10.76,0,0,1,16.123,75.242V29.56A13.432,13.432,0,0,1,29.56,16.123H48.37V5.374a5.374,5.374,0,0,1,10.749,0V16.123H77.93A13.432,13.432,0,0,1,91.366,29.56ZM44.339,43a6.718,6.718,0,1,0-6.718,6.718A6.718,6.718,0,0,0,44.339,43Zm32.247,0a6.718,6.718,0,1,0-6.718,6.718A6.718,6.718,0,0,0,76.586,43Zm30.9,0v21.5a5.368,5.368,0,0,1-5.374,5.374H96.74V37.621h5.374A5.368,5.368,0,0,1,107.489,43Z" transform="translate(0)" fill="#333"/>
        </svg>
          </Link>
      <button className="navbar-toggler hamburger-icon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon hamburger-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex">
            <Link to="/cart" className="btn btn-outline-dark m-2" type="submit">
              <i className="bi-cart-fill me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">{cartCount}</span>
            </Link>
          </form>
          <button onClick={handleLogout} className="btn btn-outline-danger m-2">
                    Logout
                </button>
      </div>
    </div>
  </nav>
  )
}