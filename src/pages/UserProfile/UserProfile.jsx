import React, { useState } from 'react';
import './UserProfile.css';
import UserInformation from '../UserImformation/UserImformation';
import MyOrders from '../UserOrder/MyOrder';
import {Link} from  'react-router-dom'

const UserProfile = () => {
  const [showOrders, setShowOrders] = useState(false);

  return (
    <div className='My_imformationcard'>
      <div className='Left_sidebar'>
        <div className='navigation'>
          <Link onClick={() => setShowOrders(false)}>My Information</Link> 
          <Link onClick={() => setShowOrders(true)}>My Orders</Link>
          <a href='/'>Logout</a> 
        </div>
      </div>
      <div className='right_imformation'>
        {showOrders ? <MyOrders /> : <UserInformation />}
      </div>
    </div>
  );
}

export default UserProfile;
