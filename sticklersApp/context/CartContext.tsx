import { Cart, CartItem } from "@/types/cart";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  use,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartContextType = {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  //updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalPrice: 0,
  });

  const addItem = (item: CartItem) => {
    console.log("adding item to cart:", item);
    setCart((prev) => ({
      ...prev,
      items: [...prev.items, item],
    }));
  };

  const removeItem = (id: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.itemId !== id),
    }));
  };

  const clearCart = () => {
    setCart({
      items: [],
      totalPrice: 0,
    });
  };

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      clearCart
    }),
    [cart],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
