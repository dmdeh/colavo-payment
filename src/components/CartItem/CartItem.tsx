import styled from "styled-components";
import DropdownMenu from "../Common/DropdownMenu/DropdownMenu";
import theme from "../../styles/theme";
import { useCartStore } from "../../store/useCartStore";
import { CartItemType, ServiceItem } from "../../types/CartType";
import { percentage } from "../../utils/calculate";

interface CartItemProps {
  item: CartItemType;
  serviceItems?: ServiceItem[];
}

const CartItem = ({ item, serviceItems }: CartItemProps) => {
  const { id, name, type } = item;

  const updateCount = useCartStore((state) => state.updateCount);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateSelectedIds = useCartStore((state) => state.updateSelectedIds);

  const handleComplete = (newCount: number) => updateCount(id, newCount);
  const handleCompleteDiscount = (selectedIds: string[]) =>
    updateSelectedIds(id, selectedIds);

  const getSelectedItems = (selectedIds: string[], rate: number) => {
    if (!serviceItems) return { ItemNames: [], totalDiscount: 0 };

    const selectedItems = serviceItems.filter(({ id }) =>
      selectedIds.includes(id)
    );

    const totalPrice = selectedItems.reduce((sum, { price }) => sum + price, 0);
    const selectedNames = selectedItems.map(({ name }) => name);

    return {
      itemNames: selectedNames,
      totalDiscount: totalPrice * rate,
    };
  };

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

  const { selectedIds = [], rate } = item;
  const { itemNames, totalDiscount } = getSelectedItems(selectedIds, rate);

  if (!itemNames) {
    console.error("할인된 아이템을 찾을 수 없습니다.");
    return;
  }

  return (
    <Item>
      <ItemTitle>
        <ItemName>{name}</ItemName>
        {itemNames.length > 0 ? (
          <>
            <ItemDetails>{itemNames.join(", ")}</ItemDetails>
            <Discount>
              -{totalDiscount.toLocaleString()}원 ({percentage(rate)}%)
            </Discount>
          </>
        ) : (
          <ItemDetails>선택된 항목이 없습니다</ItemDetails>
        )}
      </ItemTitle>
      <DropdownMenu
        type="discounts"
        title={name}
        delete={() => removeFromCart(id)}
        complete={handleComplete}
        completeDiscount={handleCompleteDiscount}
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
`;

const Discount = styled(ItemDetails)`
  color: ${theme.colors.pink200};
`;
