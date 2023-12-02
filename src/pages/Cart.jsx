import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export function Cart() {
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      // Retrieve cart from local storage
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(storedCart);
      const total = cart.reduce((acc, game) => acc + parseFloat(game.acf.price), 0).toFixed(0);
      localStorage.setItem('totalPrice', total);
    }, [cart]);
    const total = cart.reduce((acc, game) => acc + parseFloat(game.acf.price), 0).toFixed(0);
    
    const removeGame = (index) => {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      // cartcounter in Header update
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    };
  
  return (
    <div className="container cart justify-content-center">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((game, index) => (
              <li key={index} className="list-group-item">
                <h3>{game.acf.title}</h3>
                <p>Price: {game.acf.price},-</p>
                <button onClick={() => removeGame(index)} className="btn btn-danger">Remove</button>
              </li>
            ))}
          </ul>
          <div className="row d-flex">
            <div className="col-md-12 d-flex justify-content-end">
              <h5 className="pt-2">Sub Total: {total},-NOK</h5>
            </div>
            <div className="col-md-12 d-flex justify-content-end">
            <Link
              to={{
                pathname: "/Checkout",
                state: { total }
              }}
              className={`btn btn-success flex-shrink-0 ${cart.length === 0 && 'disabled'}`}
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
