import { create } from "zustand";
import { CartItemType } from "../types/CartType";

interface CartStore {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  updateCount: (id: string, newCount: number) => void;
}

const saveCartItems = (cartItems: CartItemType[]) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("로컬스토리지 저장에 실패했습니다.:", error);
  }
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),

  addToCart: (item) =>
    set((state) => {
      const itemExists = state.cartItems.some(
        (cartItem) => cartItem.id === item.id
      );
      if (!itemExists) {
        const newCart = [...state.cartItems, item];
        saveCartItems(newCart);
        return { cartItems: newCart };
      }
      return state;
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newCart = state.cartItems.filter((item) => item.id !== id);
      saveCartItems(newCart);
      return { cartItems: newCart };
    }),

  updateCount: (id, newCount) =>
    set((state) => {
      const newCart = state.cartItems.map((item) =>
        item.id === id ? { ...item, count: newCount } : item
      );
      saveCartItems(newCart);
      return { cartItems: newCart };
    }),
}));
