import React from 'react'
import './Footer.css'
import {assets} from '/src/assets'

const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" className='flogo' />
                <p>Our product delivery system ensures prompt and reliable delivery to your doorstep. With real-time tracking and secure packaging, your orders are in safe hands. Choose from flexible delivery options and count on our exceptional customer support for a hassle-free experience..</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get In Touch.</h2>
                <ul>
                   <li>+91-9898985123</li>
                   <li>jojomaart@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-cpyright'>copyright 2024 @ jojomaart.com - All Right Reserved</p>
    </div>
  )
}

export default Footer