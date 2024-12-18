import { useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'

type LoginPopupProps = {
	setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginPopup: React.FC<LoginPopupProps> = ({ setShowLogin }) => {
	const [currentState, setCurrentState] = useState("Sign up");
	return (
		<div className='login-popup'>
			<form action="" className="login-popup-container">
				<div className='login-popup-title'>
					<p>{currentState}</p>
					<img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
				</div>
				<div className="login-popup-inputs">
					{currentState ==="Sign up" 
						? <input type="text" name='name' placeholder='Your name' required/>	
						:<></>
					}
					<input type="email" name='email' placeholder='Your email' required/>
					<input type="password" name='password'placeholder='Password' required/>
				</div>
				<button>{currentState==="Sign up" ? "Create account": "Login"}</button>
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