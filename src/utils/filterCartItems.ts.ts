import { CartItemType } from "../types/CartType";

const filterCartItems = <T extends CartItemType>(
  items: CartItemType[],
  type: string
): T[] => items.filter((item): item is T => item.type === type);

export default filterCartItems;
