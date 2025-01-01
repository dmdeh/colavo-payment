import styled from "styled-components";
import DropdownMenu from "../Common/DropdownMenu/DropdownMenu";
import theme from "../../styles/theme";
import { useCartStore } from "../../store/useCartStore";
import { CartItemType, ServiceItem } from "../../types/CartType";

interface CartItemProps {
  item: CartItemType;
  serviceItems?: ServiceItem[];
}

const CartItem = ({ item, serviceItems }: CartItemProps) => {
  const { id, name, type } = item;

  const updateCount = useCartStore((state) => state.updateCount);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleComplete = (newCount: number) => updateCount(id, newCount);
  if (type === "services") {
    const { price, count } = item;

    return (
      <Item>
        <ItemTitle>
          <ItemName>{name}</ItemName>
          <ItemDetails>{price.toLocaleString()}원</ItemDetails>
        </ItemTitle>
        <DropdownMenu
          type="services"
          title={name}
          delete={() => removeFromCart(id)}
          complete={handleComplete}
        >
          {count}
        </DropdownMenu>
      </Item>
    );
  }

  return (
    <Item>
      <ItemTitle>
        <ItemName>{name}</ItemName>
      </ItemTitle>
      <DropdownMenu
        type="discounts"
        title={name}
        delete={() => removeFromCart(id)}
        complete={handleComplete}
        serviceItems={serviceItems}
      >
        수정
      </DropdownMenu>
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

const ItemDetails = styled.p`
  margin: 5px 0 0 0;
  color: ${theme.colors.gray300};
  font-size: 14px;
`;
