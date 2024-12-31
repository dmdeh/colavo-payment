export interface ServiceItem {
  id: string;
  count: number;
  name: string;
  price: number;
  type: "services";
}

export interface DiscountItem {
  id: string;
  name: string;
  rate: number;
  type: "discounts";
}

export type CartItemType = ServiceItem | DiscountItem;

export interface ServiceResponse {
  items: Record<string, CartItemType>;
}
