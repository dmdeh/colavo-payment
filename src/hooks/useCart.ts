import { useState, useEffect } from "react";

export interface CartItem {
  id: string;
  count: number;
  name: string;
  price: number;
  type: "services" | "discounts";
}

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const itemExists = cartItems.some((cartItem) => cartItem.id === item.id);

    if (!itemExists) {
      setCartItems((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCount = (id: string, newCount: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: newCount } : item))
    );
  };

  return { cartItems, addToCart, removeFromCart, updateCount };
};

export default useCart;
