import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartItems: CartItem[]
    isShown: boolean,
    setIsShown: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
} 


export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])
    const [isShown, setIsShown] = useState<boolean>(false)

    function getItemQuantity (id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        if (cartItems.find(item => item.id === id) == null) {
            setCartItems(prev => [...prev, {id, quantity: 1}])
        } else {
            setCartItems(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item))
        }

    }

    function decreaseCartQuantity (id: number) {
        if (cartItems.find(item => item.id === id)?.quantity === 1) {
            setCartItems(prev => prev.filter(item => item.id !== id))
        } else {
            setCartItems(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item))
        }
    }

    function removeFromCart (id: number) {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    return <ShoppingCartContext.Provider value={{ 
            getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart,
            cartItems,
            isShown,
            setIsShown
        }} 
    >
        {children}
    </ShoppingCartContext.Provider>
}