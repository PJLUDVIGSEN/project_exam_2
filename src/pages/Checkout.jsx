import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

export function Checkout() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Basic validation
        // if (!name || !address || !creditCard) {
        //   alert('Please fill all fields');
        //   return;
        // }
    
        // Show the confirmation modal
        setIsModalOpen(true);
      }

    const confirmPayment = () => {
        // Empty the cart
        localStorage.setItem('cart', JSON.stringify([]));
        
        // Empty cartcounter in Header
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    
        // Redirect to the browse page
        navigate('/browse');
      }

    return (
      <div className="h-100 container cart shipping justify-content-center">
        <h1>Checkout</h1>
        <h2>Shipping</h2>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">First name:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Last name:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Country:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Address:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Postal code:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Town/city:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
        <h3>Payment</h3>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Card Number:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Expiration:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">CVC:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
        <button onClick={handleSubmit} className="btn btn-dark">Next</button>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Payment Confirmation"
        >
        <h2>Confirm Payment</h2>
        <p>Are you sure you want to proceed with the payment?</p>
        <button onClick={confirmPayment} className="btn btn-success">Yes</button>
        <button onClick={() => setIsModalOpen(false)} className="btn btn-danger">No</button>
        </Modal>
      </div>
    );
  }
  
