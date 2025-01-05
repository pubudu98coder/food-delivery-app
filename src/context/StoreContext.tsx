import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export interface FoodItemType {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
}

interface contextType {
    foodList: FoodItemType[];
    addToCart: (itemId: string) => void;
    cartItems: CartItems;
    setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
    removeFromCart: (itemId: string) => void
    getTotalAmount: () => number
    accessToken: string
    setAccessToken: React.Dispatch<React.SetStateAction<string>>
}

type CartItems = {
    [itemId: string]: number;
}


export const StoreContext = createContext<contextType | undefined>(undefined);

export const StoreContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [cartItems, setCartItems] = useState<CartItems>({});
    const [accessToken, setAccessToken] = useState('');
    const [foodList, setFoodList] = useState<FoodItemType[]>([]);



    const addToCart = async (itemId: string) => {
        setCartItems(
            (prev) => {
                if (!prev[itemId]) {
                    return { ...prev, [itemId]: 1 };
                } else {
                    return { ...prev, [itemId]: prev[itemId] + 1 }
                }
            }
        );

        if (accessToken) {
            try {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/cart/add`,
                    { itemId },
                    { headers: {
                         Authorization:`Bearer ${accessToken}` } 
                    }
                );
            } catch (error) {
                alert("Item not added successfully")
            }
        }
    }

    const removeFromCart = async (itemId: string) => {
        setCartItems((prev) => {
            const newCartItems = { ...prev };
            if (newCartItems[itemId] > 0) {
                newCartItems[itemId] -= 1;
            }
            // else {
            //     delete newCartItems[itemId];
            // }
            return newCartItems;
        });

        try {
            if (accessToken) {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/cart/remove`, 
                    {itemId}, 
                    { headers: {
                        Authorization:`Bearer ${accessToken}` } 
                    }
                );
            }
        } catch (error) {
            console.log("Item not removed successfully");
        }
    }

    const loadCartData = async (accessToken:string) =>{
        try {
            if (accessToken) {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/cart/get`,
                    {},
                    {
                        headers:{
                            Authorization:`Bearer ${accessToken}`
                        }
                    }
                );
                console.log(response)
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log("Error fetching cart data");
        }

    }

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product._id === item);
                if (itemInfo?.price)
                    totalAmount += itemInfo?.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/food/list`);
            if (response.data.success) {
                setFoodList(response.data.data)
            } else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const contextValue: contextType = {
        foodList: foodList,
        addToCart: addToCart,
        cartItems: cartItems,
        setCartItems: setCartItems,
        removeFromCart: removeFromCart,
        getTotalAmount: getTotalAmount,
        accessToken: accessToken,
        setAccessToken: setAccessToken
    }

    useEffect(() => {
        console.log("Cart items: ", cartItems)
    }, [cartItems]);

    useEffect(() => {

        const loadData = async ()=> {
            await fetchFoodData();
            const localToken = localStorage.getItem("accessToken");
            console.log("local token",localToken)
            if (localToken) {
                setAccessToken(localToken);
                await loadCartData(localToken);
            }
            
        }
        loadData();
    }, [])


    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}