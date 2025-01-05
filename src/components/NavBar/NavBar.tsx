import {useContext, useState } from "react";
import { assets } from "../../assets/assets";
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

type NavBarProps = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const NavBar: React.FC<NavBarProps> = ({ setShowLogin }) => {
    const URL=`${import.meta.env.VITE_API_URL}/user`;
    const [menu, setMenu] = useState("home");
    const context = useContext(StoreContext);

    if (!context){
        return 
    }

    const {getTotalAmount, accessToken, setAccessToken} = context;
    console.log(accessToken);
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            const response = await axios.post(`${URL}/logout`,{}, {withCredentials:true});
            console.log("success",response?.data?.success)
            if (response?.data.success){
                localStorage.removeItem("accessToken");
                setAccessToken("");
                navigate("/");    
            }
            
        } catch (error:any) {
            toast.error(error.response.message)
        }
        

    }

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
                {!accessToken
                    ?<button onClick={() => setShowLogin(true)}>Sign in</button> 
                    :<div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={()=>navigate('myorders')}><img src={assets.bag_icon} alt="" />Orders</li>
                            <hr />
                            <li onClick={()=>logOut()}><img src={assets.logout_icon} alt="" />Logout</li>
                        </ul>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default NavBar