import { useState, useEffect } from "react";

export interface CartItemType {
  id: string;
  count: number;
  name: string;
  price: number;
  type: "services" | "discounts";
}

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("🚀 ~ useEffect ~:", cartItems);
  }, [cartItems]);

  const addToCart = (item: CartItemType) => {
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
