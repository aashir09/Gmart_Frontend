import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPopUp.css';
import { assets } from '/src/assets';
import { StoreContext } from '../../Context/StoreContext';

const LoginPopUp = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {  userLogin,setUserLogin } = useContext(StoreContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const { token } = await response.json();
            localStorage.setItem('token', token);
            navigate('/');
            setShowLogin(false);
            setUserLogin(true);
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Signup failed');
            }
            // Redirect to home page
            navigate('/');
            // Close the modal
            setShowLogin(false);
            setUserLogin(true);
        } catch (error) {
            setError('Email is already taken');
        }
    };

    return (
        <>
            <div className="login-popup" style={{ zIndex: 5 }}>
                <form className='login-popup-container' onSubmit={currState === 'Login' ? handleLogin : handleSignUp}>
                    <div className="login-popup-title">
                        <h2>{currState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="login-popup-inputs">
                        {currState === "Login"
                            ? null
                            : <input type='text' name="username" placeholder='Your name' required />
                        }
                        <input type='email' name="email" placeholder='Your Email' required />
                        <input type='password' name="password" placeholder='Password' required />
                    </div>
                    <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By Continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                    {currState === "Login"
                        ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                        : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                    }
                </form>
            </div>
        </>
    );
}

export default LoginPopUp;
