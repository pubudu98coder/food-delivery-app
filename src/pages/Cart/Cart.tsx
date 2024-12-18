import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const context = useContext(StoreContext);
  const navigate =  useNavigate();
  if (!context){
    return
  }

  // @ts-ignore: Unused destructured elements
  const {foodList, cartItems, removeFromCart, getTotalAmount} = context;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {
          foodList.map((item, index)=>{
            if (cartItems[item._id]>0){
              return (
                <div>
                  <div key={index} className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price*cartItems[item._id]}</p>
                  <p className='cross' onClick={()=>removeFromCart(item._id)}>X</p>
                </div>
                <hr />
                </div>
              );
            }
          })
        }
      </div>
      <div className="cart-bottom">
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
          <button onClick={() =>navigate('/order')} >PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart