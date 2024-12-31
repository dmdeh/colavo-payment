import styled from "styled-components";
import CountDropdown from "../Common/CountDropdown/CountDropdown";
import useCart, { CartItemType } from "../../hooks/useCart";
import theme from "../../styles/theme";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { id, name, price, count } = item;
  const { removeFromCart, updateCount } = useCart();

  return (
    <Item>
      <ItemTitle>
        <ItemName>{name}</ItemName>
        <Itemetails>{price.toLocaleString()}원</Itemetails>
      </ItemTitle>
      <CountDropdown
        title={name}
        delete={() => removeFromCart(id)}
        complete={(newCount) => updateCount(id, newCount)}
      >
        {count}
      </CountDropdown>
    </Item>
  );
};

export default CartItem;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${theme.colors.gray100};
`;

const ItemTitle = styled.div`
  max-width: 410px;
`;

const ItemName = styled.div`
  font-size: large;
`;

const Itemetails = styled.p`
  margin: 5px 0 0 0;
  color: ${theme.colors.gray300};
  font-size: 14px;
`;
