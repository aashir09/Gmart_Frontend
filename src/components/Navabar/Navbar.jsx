  import React, { useContext,useState } from 'react';
  import './Navbar.css';
  import { assets } from '/src/assets';
  import { Link } from 'react-router-dom';
  import { StoreContext } from '../../Context/StoreContext';

  const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState('home')
    const { getTotalCartAmount,userLogin } = useContext(StoreContext);
    function handleLogout(){
      setUserLogin(false);
    }

    return (
      <div className='navbar'>
      <Link to='/'> <img src={assets.logo} alt="" className="logo" /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu('home')} className={menu === "home" ? "active" : " "}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === "menu" ? "active" : " "}>Menu</a>
        <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === "mobile-app" ? "active" : " "}>Mobile App</a>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === "contact-us" ? "active" : " "}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <div className="container">

          <div className="row">
            <div className="col-12">
              <div className="input-group">
                <input className="form-control  py-2" type="search" placeholder="search" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" style={{ borderRadius: '0px', height: '38px', borderRadius: '0 6px 6px 0' }}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="navbar-search-icon">
            <Link to='/cart'>
              <img src={assets.basket_icon} alt="" />
              {getTotalCartAmount() > 0 && <div className="dot"></div>}
            </Link>
          </div>
          {userLogin ? (
            <div className="dropdown">
              <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <nobr>My Account</nobr>
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link to="/UserProfile" className="dropdown-item">My Profile</Link>
              <Link to="/" className="dropdown-item" onClick={handleLogout}>Logout</Link>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)}><nobr>sign in</nobr></button>
          )}
        </div>
      </div>
    );
  }

  export default Navbar;
