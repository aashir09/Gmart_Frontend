import { useState } from 'react'
import './App.css'
import Navbar from './components/Navabar/Navbar'
import {Routes,Route} from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopup/LoginPopUp'
import DetailProductView from './components/DetailProductView/DetailProductView'
import UserProfile from './pages/UserProfile/UserProfile'
import Menu from './components/ProductMenu/Menu'


function App() {
  
  const[showLogin,setShowLogin] =useState(false);
  const [category, setCategory] = useState('All'); // Initialize category state
  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
        <Navbar setShowLogin={setShowLogin}/> 
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/Order' element={<PlaceOrder/>} />
        <Route path="/DetailProductView/:id" element={<DetailProductView />} />
        <Route path="/UserProfile" element={<UserProfile/>}/>
        <Route path="/Menu/:category" element={<Menu category={category} />} />   
        </Routes>
      </div>
      <Footer/>
      </>
  )
}

export default App
