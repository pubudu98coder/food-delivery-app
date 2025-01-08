import { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

const PlaceOrder = () => {
	//accessing stordContext
	const context = useContext(StoreContext);
	if (!context) return;
	const { getTotalAmount, foodList, cartItems} = context;
	//accessing authcontext
	const authContext = useContext(AuthContext);
	if (!authContext) return;
	const {auth} = authContext;


	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		street: '',
		city: '',
		state: '',
		zipcode: '',
		country:'',
		phone: ''
	});
	
	const navigate = useNavigate();
	const handleChange =  (event:any) =>{
		const name = event.target.name;
		const value=  event.target.value;

		setData((prev) => ({
			...prev,
			[name]: value
		}));
	}

	const placeOrder = async (event: any) =>{
		event.preventDefault();

		let orderItems: 
		{ quantity: number; _id: string; name: string; image: string; price: number; description: string; category: string; }[] = [];
		foodList.map((item)=>{
			if (cartItems[item._id] > 0) {
				let itemInfo = {
					...item,
					quantity: cartItems[item._id]
				};
				orderItems.push(itemInfo);
			}
		});

		let orderData = {
			address: data,
			items: orderItems,
			amount: getTotalAmount()+2
		}

		try {
			let response = await axios.post(`${import.meta.env.VITE_API_URL}/order/place`, orderData, {
				headers:{
					Authorization:`Bearer ${auth?.accessToken}`
				}}
			);
			console.log("dgf", response);
			if (response.data.success) {
				const {session_url} = response.data;
				window.location.replace(session_url);
			} else {
				alert("error")
			}
		} catch (error) {
			alert("Internal server error");
		}

		console.log("",orderItems)

	}

	useEffect(()=>{
		if (!auth?.accessToken) {
			navigate('/cart')
		} else if (getTotalAmount() === 0) {
			navigate('/cart');
		} 
	}, [auth?.accessToken]);

	return (
		<form onSubmit={placeOrder} action="" className="place-order">
			<div className="place-order-left">
				<p className="title">Delivery information</p>
				<div className="multi-fields">
					<input  required name='firstName' onChange={handleChange} value ={data.firstName} type="text" placeholder='First name' />
					<input required name='lastName' onChange={handleChange} value ={data.lastName} type="text" placeholder='Last name' />
				</div>
				<input required name='email' onChange={handleChange} value ={data.email} type="email" placeholder='Email address' />
				<input required name='street' onChange={handleChange} value ={data.street} type="text" placeholder='Street' />
				<div className="multi-fields">
					<input required name='city' onChange={handleChange} value ={data.city} type="text" placeholder='City' />
					<input required name='state' onChange={handleChange} value ={data.state} type="text" placeholder='State' />
				</div>
				<div className="multi-fields">
					<input required name='zipcode' onChange={handleChange} value ={data.zipcode} type="text" placeholder='Zip code' />
					<input required name='country' onChange={handleChange} value ={data.country} type="text" placeholder='Country' />
				</div>
				<input required name='phone' onChange={handleChange} value ={data.phone} type="text" placeholder='Phone'/>
			</div>
			<div className="place-order-right">
				<div className="cart-total">
					<h2>Cart Totals</h2>
					<div>
						<div className="cart-total-details">
							<p>Subtotal</p>
							<p>${getTotalAmount()}</p>
						</div>
						<hr />
						<div className="cart-total-details">
							<p>Delivery Fee</p>
							<p>${getTotalAmount() === 0 ? 0 : 2}</p>
						</div>
						<hr />
						<div className="cart-total-details">
							<b>Total</b>
							<b>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</b>
						</div>
					</div>
					<button type='submit'>PROCEED PAYMENT</button>
				</div>
			</div>
		</form>
	)
}

export default PlaceOrder