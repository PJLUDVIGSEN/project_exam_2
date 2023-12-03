import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export function Cart() {
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      // Retrieve cart from local storage
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(storedCart);
    }, []);

    // Calculate total when cart changes
    const total = cart.reduce((acc, game) => acc + parseFloat(game.acf.price), 0).toFixed(0);
    
    useEffect(() => {
      localStorage.setItem('totalPrice', total);
      // cartcounter in Header update
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }, [total]);

    const removeGame = (index) => {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      // cartcounter in Header update
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    };
  
  return (
    <div className="container cart d-flex flex-column min-vh-100 justify-content-center">
      {cart.length === 0 ? (
        <>
          <Link className="" to="/browse">
            <svg className="d-flex mx-auto" xmlns="http://www.w3.org/2000/svg" width="107.489" height="85.991" viewBox="0 0 107.489 85.991">
              <path id="_8542249_robot_icon" data-name="8542249_robot_icon" d="M5.374,37.621h5.374V69.868H5.374A5.368,5.368,0,0,1,0,64.494V43a5.368,5.368,0,0,1,5.374-5.374ZM91.366,29.56V75.242A10.76,10.76,0,0,1,80.617,85.991H26.872A10.76,10.76,0,0,1,16.123,75.242V29.56A13.432,13.432,0,0,1,29.56,16.123H48.37V5.374a5.374,5.374,0,0,1,10.749,0V16.123H77.93A13.432,13.432,0,0,1,91.366,29.56ZM44.339,43a6.718,6.718,0,1,0-6.718,6.718A6.718,6.718,0,0,0,44.339,43Zm32.247,0a6.718,6.718,0,1,0-6.718,6.718A6.718,6.718,0,0,0,76.586,43Zm30.9,0v21.5a5.368,5.368,0,0,1-5.374,5.374H96.74V37.621h5.374A5.368,5.368,0,0,1,107.489,43Z" transform="translate(0)" fill="#333"/>
            </svg>
            <p className="text-center font-kanit m-0">Your cart is empty</p>
            <p className="text-center font-kanit">Click me to browse more games</p>
          </Link>
        </>
      ) : (
        <>
        <h1 className="font-syncopate d-flex justify-content-center">Cart</h1>
          <ul className="list-group cart_container">
            {cart.map((game, index) => (
              <li key={index} className="list-group-item cart_item">
                <h4 className="font-syncopate">{game.acf.title}</h4>
                <div className="d-flex justify-content-between">
                <h4 className="font-kanit">{game.acf.price},-</h4>
                <button onClick={() => removeGame(index)} className="btn btn-outline-danger">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="row d-flex">
            <div className="col-md-12 d-flex justify-content-end">
              <h5 className="font-kanit pt-2">Sub Total: {total},-NOK</h5>
            </div>
            <div className="col-md-12 d-flex justify-content-end">
            <Link
              to={{
                pathname: "/Checkout",
                state: { total }
              }}
              className={`btn btn-success mb-2 flex-shrink-0 ${cart.length === 0 && 'disabled'}`}
            >
              Checkout
            </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
