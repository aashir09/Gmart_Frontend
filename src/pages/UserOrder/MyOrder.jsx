
import React, { useState, useEffect } from 'react';
import "./MyOrder.css"
import { food_list } from '/src/assets';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Fetch data from the API endpoint
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/api/orders/my-orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderOrders = () => {
    return orders.map(order => (
      <div key={order._id} className="card-body">
        <p className="small text-muted mb-0">Order Number: {order.orderNumber}</p>
        {order.products.map(product => (
          <div key={product._id} className="row">
            <div className="col-md-2">
              <img src={product.thumbnail} className="img-fluid" alt={product.name} />
            </div>
            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
              <p className="text-muted mb-0">{product.name}</p>
            </div>
            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
              <p className="text-muted mb-0 small" style={{textAlign:'left'}}>Food provides essential nutrients for overall health and well-being</p>
            </div>
            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
              <p className="text-muted mb-0 small">Category: {product.category}</p>
            </div>
            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
              <p className="text-muted mb-0 small">Qty: {product.quantity}</p>
            </div>
            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
              <p className="text-muted mb-0 small">₹{product.total}</p>
            </div>
          </div>
        ))}
        <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: '1' }} />
        <div className="row d-flex align-items-center">
          <div className="col-md-2">
            <p className="text-muted mb-0 small">Track Order</p>
          </div>
          <div className="col-md-10">
            <div className="progress" style={{ height: '6px', borderRadius: '16px' }}>
              <div className="progress-bar" role="progressbar" style={{ width: getStatusWidth(order.orderStatus), borderRadius: '16px', backgroundColor: getStatusColor(order.orderStatus) }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className="d-flex justify-content-around mb-1">
              <p className="text-muted mt-1 mb-0 small ms-xl-5">Preparing</p>
              <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivery</p>
              <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const getStatusWidth = (status) => {
    switch (status) {
      case 'Preparing':
        return '33%'; // 33% progress for 'Preparing' status
      case 'Out for delivery':
        return '66%'; // 66% progress for 'Out for delivery' status
      case 'Delivered':
        return '100%'; // 100% progress for 'Delivered' status
      default:
        return '0%';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Preparing':
        return '#a8729a'; // Purple color for 'Preparing' status
      case 'Out for delivery':
        return '#ffbf00'; // Yellow color for 'Out for delivery' status
      case 'Delivered':
        return '#5cb85c'; // Green color for 'Delivered' status
      default:
        return '#e0e0e0'; // Default gray color
    }
  };

  return (
    <div>
      {renderOrders()}
    </div>
  );
};

export default MyOrder;
