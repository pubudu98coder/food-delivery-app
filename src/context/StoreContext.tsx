import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export interface FoodItemType {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
}

interface contextType {
    foodList:FoodItemType[];
    addToCart:(itemId:string) =>void;
    cartItems:CartItems;
    setCartItems:React.Dispatch<React.SetStateAction<CartItems>>;
    removeFromCart:(itemId:string) => void
    getTotalAmount:() => number
}

type CartItems = {
    [itemId: string]:number;
}


export const StoreContext = createContext<contextType | undefined>(undefined);

export const StoreContextProvider :React.FC<{ children: React.ReactNode }>= ({children}) => {

    const [cartItems, setCartItems] = useState<CartItems>({});

    const addToCart = (itemId :string) =>{
       setCartItems(
        (prev) => {
            if (!prev[itemId]) {
                return {...prev,[itemId]:1};
            } else {
                return {...prev, [itemId]: prev[itemId]+1}
            }
        }
       );
    }

    const removeFromCart = (itemId:string) =>{
        setCartItems((prev) =>{
            const newCartItems = { ...prev};
            if (newCartItems[itemId] > 0) {
                newCartItems[itemId] -= 1;
            } 
            // else {
            //     delete newCartItems[itemId];
            // }
            return newCartItems;
        });
            
    }

    const getTotalAmount = () =>{
        let totalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo?.price)
                    totalAmount += itemInfo?.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const contextValue : contextType= {
        foodList:food_list,
        addToCart:addToCart,
        cartItems:cartItems,
        setCartItems:setCartItems,
        removeFromCart:removeFromCart,
        getTotalAmount:getTotalAmount
    }

    useEffect(()=>{
        console.log("Cart items: ", cartItems)
    }, [cartItems]);

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}