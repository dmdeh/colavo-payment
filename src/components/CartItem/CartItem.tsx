import styled from "styled-components";
import CountDropdown from "../Common/CountDropdown/CountDropdown";
import theme from "../../styles/theme";
import { useCartStore } from "../../store/useCartStore";
import { CartItemType } from "../../types/CartType";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { id, name } = item;

  const updateCount = useCartStore((state) => state.updateCount);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleComplete = (newCount: number) => updateCount(id, newCount);
  if (item.type === "services") {
    const { price, count } = item;

    return (
      <Item>
        <ItemTitle>
          <ItemName>{name}</ItemName>
          <Itemetails>{price.toLocaleString()}원</Itemetails>
        </ItemTitle>
        <CountDropdown
          title={name}
          delete={() => removeFromCart(id)}
          complete={handleComplete}
        >
          {count}
        </CountDropdown>
      </Item>
    );
  }
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
