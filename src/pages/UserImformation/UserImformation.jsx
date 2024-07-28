import React from 'react';
import './userImformation.css';

const UserInformation = () => {
  return (
    <div className="container">
      <div className="content">
        <form action="#">
          <div className="user-details">
            <div className="input-box">
              <span className="details">Full Name</span>
              <input type="text" placeholder="Enter your name" value="Mansuri Mohammed Aashir"required />
            </div>
            <div className="input-box">
              <span className="details">Contact Numer</span>
              <input type="number" placeholder="Enter your username" value="9898985123" required/>
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="email" placeholder="Enter your email" value="aashirmansuri@gmail.com" required />
            </div>
            <div className="input-box">
              <span className="details">Country</span>
              <input type="text" placeholder="Enter your password" value="India" required />
            </div>
            <div className="input-box">
              <span className="details">Address</span>
              <textarea rows="4" cols="110" value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error incidunt explicabo praesentium, alias quos nobis qui obcaecati similique expedita quasi?" required />
            </div>
          </div>
         
          <div className="button-container">
            <div className="button">
              <input type="submit" value="Save" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserInformation;
