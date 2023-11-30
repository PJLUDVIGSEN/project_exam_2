import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

export function Checkout() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        address: '',
        postalCode: '',
        expiration: '', 
        townCity: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateExpiration = (expiration) => {
        const matches = expiration.match(/^(\d{2})\/(\d{2})$/);
        if (matches) {
            const month = parseInt(matches[1], 10);
            const year = parseInt(matches[2], 10) + 2000;
    
            const expirationDate = new Date(year, month, 0); // Last day of the expiration month
            const currentDate = new Date();
    
            return expirationDate > currentDate && month >= 1 && month <= 12;
        }
        return false;
    };

    const validate = () => {
        let tempErrors = {};
        // validation rules
        tempErrors.firstName = formData.firstName ? '' : 'First name is required';
        tempErrors.lastName = formData.lastName ? '' : 'Last name is required';
        tempErrors.country = formData.country ? '' : 'Country is required';
        tempErrors.address = formData.address ? '' : 'Address is required';
        tempErrors.postalCode = /^[0-9]{4}$/.test(formData.postalCode) ? '' : 'ZIP code must be 4 digits';
        tempErrors.townCity = formData.townCity ? '' : 'Town/city is required';
        tempErrors.cardNumber = /^[0-9]{10,20}$/.test(formData.cardNumber) ? '' : 'Card number must be between 10 and 20 digits';
        tempErrors.expiration = validateExpiration(formData.expiration) ? '' : 'Invalid or past expiration date (MM/YY)';
        tempErrors.cvc = /^[0-9]{3}$/.test(formData.cvc) ? '' : 'CVC must be 3 digits';

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validate()) {
            setIsModalOpen(true);
        }
      };

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
        <form onSubmit={handleSubmit}>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">First name:</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange} 
                />
                {errors.firstName && <p className='errormessage'>{errors.firstName}</p>}
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Last name:</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange} 
                />
                {errors.lastName && <p className='errormessage'>{errors.lastName}</p>}
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Country:</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="country"
                    value={formData.country}
                    onChange={handleChange} 
                />
                {errors.country && <p className='errormessage'>{errors.country}</p>}
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Address:</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange} 
                />
                {errors.address && <p className='errormessage'>{errors.address}</p>}
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Postal code:</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange} 
                />
                {errors.postalCode && <p className='errormessage'>{errors.postalCode}</p>}
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Town/City:</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="townCity"
                    value={formData.townCity}
                    onChange={handleChange} 
                />
                {errors.townCity && <p className='errormessage'>{errors.townCity}</p>}
            </div>
        <h3>Payment</h3>
        <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Card number:</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange} 
                />
                {errors.cardNumber && <p className='errormessage'>{errors.cardNumber}</p>}
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Expiration (MM/YY):</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleChange} 
                />
                {errors.expiration && <p className='errormessage'>{errors.expiration}</p>}
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">CVC:</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange} 
                />
                {errors.cvc && <p className='errormessage'>{errors.cvc}</p>}
            </div>
        <button type='submit' onClick={handleSubmit} className="btn btn-dark">Next</button>
        </form>
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
  
