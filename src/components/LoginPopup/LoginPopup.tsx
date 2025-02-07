import { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import axios from '../../api/axios';
import { StoreContext } from '../../context/StoreContext';
import {toast} from 'react-toastify';
import AuthContext from '../../context/AuthProvider'; 

type LoginPopupProps = {
	setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginPopup: React.FC<LoginPopupProps> = ({ setShowLogin }) => {
	const [currentState, setCurrentState] = useState("Sign up");
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: ''
	});

	const context = useContext(StoreContext);
	if (!context) return;

	const authContext = useContext(AuthContext);
	if (!authContext) return;
	const {setAuth} = authContext;


	const handleChange = (e: any) => {
		const name = e.target.name;
		const value = e.target.value;
		setUserData((prev) => ({
			...prev,
			[name]: value
		}));
	}

	const handleLogin = async (e: any) =>{
		console.log("Clicked");
		e.preventDefault();
		let url = `/user/${currentState==="Login"?'login': 'register'}`
		try{
			const response = await axios.post(url, userData,{withCredentials:true});
			console.log(response);
			if (response?.data?.success) {
				console.log(response?.data)
				const accessToken = response?.data?.accessToken;
				const roleList = response?.data?.roleList;
				const userId =response?.data?.userId;
				
				setAuth({accessToken,userId,roleList })
				localStorage.setItem("accessToken",accessToken);
				setShowLogin(false);
				toast.success(response.data.message);
			}
		} catch (error:any) {
			if (error.response) {
				toast.error(error.response?.data?.message);
			} else {
				toast.error("No server response");
			}
				
		}
	}

	console.log("Authcontext", authContext);

	return (
		<div className='login-popup'>
			<form onSubmit={handleLogin} className="login-popup-container">
				<div className='login-popup-title'>
					<p>{currentState}</p>
					<img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
				</div>
				<div className="login-popup-inputs">
					{currentState ==="Sign up" 
						? <input onChange={handleChange} value= {userData.name} type="text" name='name' placeholder='Your name' required/>	
						:<></>
					}
					<input onChange={handleChange} value={userData.email} type="email" name='email' placeholder='Your email' required/>
					<input onChange={handleChange} value={userData.password} type="password" name='password'placeholder='Password' required/>
				</div>
				<button type='submit'>{currentState==="Sign up" ? "Create account": "Login"}</button>
				{currentState ==="Sign up"
					? <div className="login-popup-condition">
						<input type="checkbox" required/>
						<p>By continuing, i agree to the terms of use & privacy policy</p>
					</div>
					:<></>
				}
				{currentState==="Sign up"
					?<p>Already have account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
					:<p>Create new account <span onClick={()=>setCurrentState("Sign up")}>Click here</span></p>
				}
			</form>
		</div>
	)
}

export default LoginPopup