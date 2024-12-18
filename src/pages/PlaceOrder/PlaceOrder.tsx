import { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const context = useContext(StoreContext);
  if (!context){
    return
  }
  const {getTotalAmount} =  context;

  return (
    <form action="" className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name'/>
          <input type="text" placeholder='Last name'/>
        </div>
        <input type="email" placeholder='Email address'/>
        <input type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code'/>
          <input type="text" placeholder='Country'/>
        </div>
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
                <p>${getTotalAmount() ===0 ? 0:2}</p>
              </div>  
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalAmount() ===0 ? 0 : getTotalAmount()+2}</b>
              </div>        
            </div>
            <button >PROCEED PAYMENT</button>
          </div>
        </div>
    </form>
  )
}

export default PlaceOrder