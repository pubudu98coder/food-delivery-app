import React, { useContext, useState } from 'react'
import './FoodItem.css'
import {FoodItemType, StoreContext  } from '../../context/StoreContext'
import { assets } from '../../assets/assets';

interface FoodItemProps{
    item: FoodItemType;
}

const FoodItem: React.FC<FoodItemProps> = ({item}) => {
    const [itemCount, setItemCount] = useState(0);
    const context = useContext(StoreContext);
    if (!context) {
        return <p>Error: StoreContext is not available.</p>;
    }
    // @ts-ignore: Unused destructured elements
    const{foodList,cartItems, addToCart, removeFromCart} = context; 

  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img src={`${'http://localhost:5000'}/images/${item.image}`} alt="" className="food-item-image" />
            {!cartItems[item._id]
                ? <img src={assets.add_icon_white} alt="" className="add" onClick={()=>addToCart(item._id)}/>
                : <div className="food-item-counter">
                    <img src={assets.remove_icon_red} alt="" onClick={()=>removeFromCart(item._id)}/>
                    <p>{cartItems[item._id]}</p>
                    <img src={assets.add_icon_green} alt="" onClick={()=>addToCart(item._id)}/>
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{item.name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc'>{item.description}</p>
            <p className="food-item-price">${item.price}</p>
        </div>
        
    </div>
  )
}

export default FoodItem