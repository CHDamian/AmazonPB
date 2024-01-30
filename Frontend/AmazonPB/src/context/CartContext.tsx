import { create } from "@mui/material/styles/createTransitions";
import { ReactNode, createContext, useContext, useState } from "react";



type CartItem = {
    id: number;
    name: string;
    value: number;
    img: string | null;
    description: string;
    tags: string[];
}

type CartContextType = {
    cart: CartItem[];
    Add: (item: CartItem) => void;
    Remove: (item: CartItem) => void;
    Clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartInit = () => {
    const el = localStorage.getItem('cart');
    if(el)return JSON.parse(el);
    return [];
}

type CartProviderProps = {
    children: ReactNode;
  };

export const CartProvider: React.FC<CartProviderProps> = ({ children }) =>{
    const [cart, setCart] = useState<CartItem[]>(CartInit());

    const Add = (item: CartItem) =>{
        let updatedCart = cart;
        if(!updatedCart.find((e) => e.id === item.id))
        {
            updatedCart.push(item);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const Remove = (item: CartItem) => {
        const updatedCart = cart.filter((e) => e.id !== item.id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const Clear = () =>{
        setCart([]);
        localStorage.removeItem('cart');
    }

    const contextValue: CartContextType = {
        cart,
        Add,
        Remove,
        Clear,
      };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };