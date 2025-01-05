import axios from 'axios';
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';

const Verify = () => {
    const [searchParams, setSearchParams] =useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/order/verify`,{success,orderId});
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            alert("Error");
        }
    }

    useEffect(()=>{
        verifyPayment();
    }, []);

  return (
    <div className='verify'>
        <div className="spinner"></div>    
    </div>
  )
}

export default Verify