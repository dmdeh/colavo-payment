import styled from "styled-components";

export type CurrencyCode = keyof typeof currencyFormatters;

interface PriceFormatterProps {
  amount: number;
  currencyCode: CurrencyCode;
}

const currencyFormatters = {
  USD: (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount),
  KRW: (amount: number) => `${amount.toLocaleString()}원`,
};

const PriceFormatter: React.FC<PriceFormatterProps> = ({
  amount,
  currencyCode = "KRW",
}) => {
  const formatPrice = (amount: number, code: CurrencyCode) =>
    currencyFormatters[code](amount);

  return <TotalAmount>{formatPrice(amount, currencyCode)}</TotalAmount>;
};

export default PriceFormatter;

const TotalAmount = styled.span`
  font-size: x-large;
`;
