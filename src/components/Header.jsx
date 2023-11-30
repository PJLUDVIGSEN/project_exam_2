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
        <Link to="/browse">
          <h2 className="navbar-brand" href="#">bitsandbotslogo?</h2>
          </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/browse" className="nav-link active" aria-current="page">Home</Link>
          </li>
          </ul>
          <form className="d-flex">
            <Link to="/cart" className="btn btn-outline-dark" type="submit">
              <i className="bi-cart-fill me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">{cartCount}</span>
            </Link>
          </form>
          <button onClick={handleLogout} className="btn btn-outline-dark">
                    Logout
                </button>
      </div>
    </div>
  </nav>
  )
}