import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';

export function Checkout() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [totalPrice, setTotalPrice] = useState(0);
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);


    useEffect(() => {
        if (location.state && location.state.total) {
            setTotalPrice(location.state.total);
        } else {
            const storedTotal = localStorage.getItem('totalPrice');
            if (storedTotal) {
                setTotalPrice(storedTotal);
            }
        }
    }, [location, navigate]);

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
        
        setShowConfirmationMessage(true);
        // Empty the cart
        localStorage.setItem('cart', JSON.stringify([]));

        // Empty cartcounter in Header
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    
        // Redirect to the browse page
        setTimeout(() => {
            navigate('/browse');
        }, 5000);
      }

    return (
      <div className="h-100 container cart shipping d-flex flex-column min-vh-100">
        <h1 className='font-syncopate d-flex justify-content-center'>Checkout</h1>
        <h2 className='font-kanit d-flex justify-content-center'>Shipping</h2>
        <form className='justify-content-center' onSubmit={handleSubmit}>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">First name:</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange} 
                />
                {errors.firstName && <p className='checkout__error-message input-group justify-content-center'>{errors.firstName}</p>}
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
                {errors.lastName && <p className='checkout__error-message input-group justify-content-center'>{errors.lastName}</p>}
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
                {errors.country && <p className='checkout__error-message input-group justify-content-center'>{errors.country}</p>}
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
                {errors.address && <p className='checkout__error-message input-group justify-content-center'>{errors.address}</p>}
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
                {errors.postalCode && <p className='checkout__error-message input-group justify-content-center'>{errors.postalCode}</p>}
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
                {errors.townCity && <p className='checkout__error-message input-group justify-content-center'>{errors.townCity}</p>}
            </div>
        <h3 className='font-kanit d-flex justify-content-center'>Payment</h3>
        <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Card number:</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange} 
                />
                {errors.cardNumber && <p className='checkout__error-message input-group justify-content-center'>{errors.cardNumber}</p>}
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
                {errors.expiration && <p className='checkout__error-message input-group justify-content-center'>{errors.expiration}</p>}
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
                {errors.cvc && <p className='checkout__error-message input-group justify-content-center'>{errors.cvc}</p>}
            </div>
            <div className='d-flex justify-content-end'>
                <button type='submit' onClick={handleSubmit} className="btn btn-success justify-content-end mb-2">Next</button>
            </div>
        </form>
        <Modal 
        className="ReactModal__Content"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Payment Confirmation"
        >
        <h2 className='font-syncopate'>Confirm Payment</h2>
        <p className='font-kanit'>First name: {formData.firstName}</p>
        <p className='font-kanit'>Last name: {formData.lastName}</p>
        <p className='font-kanit'>Country: {formData.country}</p>
        <p className='font-kanit'>Address: {formData.address}</p>
        <p className='font-kanit'>Postal code: {formData.postalCode}</p>
        <p className='font-kanit'>Town/City: {formData.townCity}</p>
        <h2 className='font-kanit'>Total Price: {totalPrice},-NOK</h2>
        {showConfirmationMessage && (
        <div className="confirmation-message">
            <h2 className='font-kanit text-success'>Thank you for your purchase! Redirecting...</h2>
        </div>
        )}
        <div className='checkout__buttons-modal'>
        <button onClick={confirmPayment} className="btn btn-success btn__modal">Complete</button>
        <button onClick={() => setIsModalOpen(false)} className="btn btn-danger btn__modal">Go back</button>
        </div>
        </Modal>
      </div>
    );
  }
  
