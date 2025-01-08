import { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import AuthContext from '../../context/AuthProvider';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const authContext = useContext(AuthContext);
    if (!authContext) return;
    const {auth} = authContext;

    const fetchOrders = async () => {
        try {
            const response =await  axios.post(
                `${import.meta.env.VITE_API_URL}/order/userorders`,
                {},
                {
                    headers:{
                        Authorization: `Bearer ${auth?.accessToken}`
                    }
                }
            );
            setData(response?.data.data);
            console.log(response?.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if (auth?.accessToken) {
            fetchOrders();
        }
    }, [auth?.accessToken]);

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {
                data?.map((order:any, index) =>{
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item:any,index:number)=>{
                                if (index === order.items.length-1){
                                    return item.name+" X "+ item.quantity;
                                } else {
                                    return item.name+" X "+ item.quantity+", ";
                                }
                            })}</p>
                            <p>Order Amount: ${order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders} >Track order</button>
                        </div>
                    );
                })
            }
        </div>
    </div>
  )
}

export default MyOrders