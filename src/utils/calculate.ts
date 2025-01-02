import { CartItemType, DiscountItem, ServiceItem } from "../types/CartType";
import filterCartItems from "./filterCartItems.ts";

export const percentage = (rate: number) => Math.round(rate * 100);

export const calculateSumPrice = (items: ServiceItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.count, 0);
};

export const calculateTotal = (cartItems: CartItemType[]) => {
  let total = 0;
  const serviceItems = filterCartItems<ServiceItem>(cartItems, "services");
  const discountItems = filterCartItems<DiscountItem>(cartItems, "discounts");

  total += calculateSumPrice(serviceItems);

  discountItems.forEach((discountItem) => {
    const selectedItems = discountItem.selectedIds
      .map((id) => serviceItems.find((service) => service.id === id))
      .filter((item): item is ServiceItem => item !== undefined);

    const totalAmount = calculateSumPrice(selectedItems);
    const discountedAmount = totalAmount * discountItem.rate;

    total -= discountedAmount;
  });

  return total;
};
