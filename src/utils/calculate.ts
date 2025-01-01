export const percentage = (rate: number) => Math.round(rate * 100);

export const calculateDiscount = (totalPrice: number, discountRate: number) => {
  return Math.floor(totalPrice * (discountRate / 100));
};
