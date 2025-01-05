import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import Home from "./pages/Home/Home"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Cart from "./pages/Cart/Cart"
import Footer from "./components/Footer/Footer"
import { useState } from "react"
import LoginPopup from "./components/LoginPopup/LoginPopup"
import './index.css'
import Verify from "./pages/Verify/Verify"
import MyOrders from "./pages/MyOrders/MyOrders"
import {ToastContainer} from 'react-toastify';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    <ToastContainer/>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
      <NavBar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/cart" element = {<Cart/>}/>
        <Route path="/order" element = {<PlaceOrder/>}/>
        <Route path="/verify" element = {<Verify/>}/>
        <Route path="/myorders" element = {<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
    
  )
}

export default App