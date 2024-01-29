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

type CartProviderProps = {
    children: ReactNode;
  };

export const CartProvider: React.FC<CartProviderProps> = ({ children }) =>{
    const [cart, setCart] = useState<CartItem[]>([]);

    const Add = (item: CartItem) =>{
        if(!cart.find((e) => e.id === item.id))
        {
            cart.push(item);
            setCart(cart);
        }
    };

    const Remove = (item: CartItem) =>{
        const it = cart.findIndex((e) => e.id === item.id);
        if(it != -1)
        {
            cart.splice(it, 1);
            setCart(cart);
        }
    };

    const Clear = () =>{
        setCart([]);
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