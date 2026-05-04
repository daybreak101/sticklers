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
import { View, Text } from "react-native";
type CartContextType = {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateItem: (cartItemId: string, item: CartItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  showToast: (message: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalPrice: 0,
  });

  useEffect(() => {
    calculateTotalPrice();
  }, [cart.items]);

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
      items: prev.items.filter((i) => i.cartItemId !== id),
    }));
  };

  const updateItem = (cartItemId: string, item: CartItem) => {
    setCart((prev) => {
      const index = prev.items.findIndex((i) => i.cartItemId === cartItemId);
      if (index === -1) return prev;
      return {
        ...prev,
        items: [
          ...prev.items.slice(0, index),
          item,
          ...prev.items.slice(index + 1),
        ],
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      totalPrice: 0,
    });
  };

  //TODO: implement updateQuantity
  const updateQuantity = (cartItemId: string, quantity: number) => {
    setCart((prev) => {
      const item = prev.items.find((i) => i.cartItemId === cartItemId);
      if (!item) return prev;
      const newQuantity = item.quantity + quantity;

      return {
        ...prev,
        items: prev.items.map((i) => {
          if (i.cartItemId === cartItemId) {
            return {
              ...i,
              quantity: newQuantity,
            };
          }
          return i;
        }),
      };
    });
  };

  //TODO: implement calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    cart.items.forEach((item) => {
      total += item.finalPrice * item.quantity;
    });
    setCart((prev) => ({ ...prev, totalPrice: total }));
  };

  const [toast, setToast] = useState<string | null>(null);
  function Toast() {
    return (
      <>
        {toast && (
          <View style={{ position: "absolute", bottom: 20, right: 20 }}>
            <Text>{toast}</Text>
          </View>
        )}
      </>
    );
  }
  const showToast = (message: string): void => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      updateItem,
      clearCart,
      updateQuantity,
      showToast,
    }),
    [cart],
  );
  return (
    <CartContext.Provider value={value}>
      {children}
      <Toast />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
