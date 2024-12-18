import {useContext, useState } from "react";
import { assets } from "../../assets/assets";
import './Navbar.css'
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

type NavBarProps = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const NavBar: React.FC<NavBarProps> = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const context = useContext(StoreContext);

    if (!context){
        return 
    }

    const {getTotalAmount} = context;

    return (
        <div className="navbar">
            <img src={assets.logo} className="logo" />
            <ul className="navbar-menu">
                <Link to={'/'} className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>Home</Link>
                <a href='#explore-menu' className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>Menu</a>
                <a href='#app-download' className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>Mobile-App</a>
                <a href='#footer' className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'> <img src={assets.basket_icon} alt="" /> </Link>
                    <div className={getTotalAmount()===0? "": "dot" }></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign in</button>
            </div>
        </div>
    )
}

export default NavBar