import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import LoginPopUp from '../../components/LoginPopup/LoginPopUp'; // Import your login popup component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, userLogin } = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false); // State to manage login popup visibility
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      // Payment API Call
      const paymentResponse = await fetch('http://localhost:3000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: getTotalCartAmount(),
        })
      });
  
      if (!paymentResponse.ok) {
        console.error('Failed to create payment order:', paymentResponse.statusText);
        return;
      }
  
      const paymentData = await paymentResponse.json();
  
      // Open Razorpay payment window
      const options = {
        key: 'rzp_test_knOVu1NYKsdaZl',
        amount: getTotalCartAmount() * 100, // Amount in paise
        currency: 'INR',
        order_id: paymentData.orderId, // Order ID received from backend
        name: '',
        description: 'Payment for your order',
        handler: function(response) {
          // Handle successful payment here, you may want to update UI or redirect to confirmation page
          console.log('Payment successful:', response);
          toast.success('Order placed successfully!');
        },
        prefill: {
          name: formData.firstName + ' ' + formData.lastName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#F37254',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  
      // Place Order API Call
      const products = Object.entries(cartItems).map(([productId, quantity]) => {
        const foundItem = food_list.find(item => item._id === productId);
        return {
          productId,
          name: foundItem ? foundItem.name : '',
          quantity,
          total: foundItem ? quantity * foundItem.price : 0,
          thumbnail: foundItem ? foundItem.thumbnail : '',
          category: foundItem ? foundItem.category : ''
        };
      });
  
      // Make sure token exists
      if (!token) {
        console.error('No token found in local storage');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/orders/place-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            products,
            totalPrice: getTotalCartAmount(),
            userDetails: formData
          })
        });
  
        if (!response.ok) {
          console.error('Failed to place order:', response.statusText);
        }
      } catch (error) {
        console.error('Error placing order:', error);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>    
     <ToastContainer />
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' name="firstName" value={formData.firstName} onChange={handleChange} />
          <input type="text" placeholder='Last Name' name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <input type="email" placeholder='Email address' name="email" value={formData.email} onChange={handleChange} />
        <input type="text" placeholder='Street' name="street" value={formData.street} onChange={handleChange} />
        <div className="multi-fields">
          <input type="text" placeholder='City' name="city" value={formData.city} onChange={handleChange} />
          <input type="text" placeholder='State' name="state" value={formData.state} onChange={handleChange} />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' name="zipCode" value={formData.zipCode} onChange={handleChange} />
          <input type="text" placeholder='Country' name="country" value={formData.country} onChange={handleChange} />
        </div>
        <input type='text' placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
        </div>
        {userLogin ? (
          <button className='place_Order' type="submit" disabled={paymentLoading}>
            {paymentLoading ? 'Processing Payment...' : 'Place Order'}
          </button>
        ) : (
          <button className='login-button place_Order' onClick={() => setShowLogin(true)} disabled={paymentLoading}>
            {paymentLoading ? 'Processing Payment...' : 'Login to Place Order'}
          </button>
        )}
      </div>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
    </form>
    </>

  );
};

export default PlaceOrder;
