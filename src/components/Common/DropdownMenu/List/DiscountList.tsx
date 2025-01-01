import { ServiceItem } from "../../../../types/CartType";
import styled from "styled-components";
import theme from "../../../../styles/theme";
import { CheckOutlined } from "@ant-design/icons";

interface DiscountListProps {
  items: ServiceItem[];
  selectedIds: string[];
  onSelect: (id: string) => void;
}

const DiscountList = ({ items, selectedIds, onSelect }: DiscountListProps) => (
  <ScrollArea>
    {items.map(({ id, name, price }) => (
      <CartItem
        key={id}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
      >
        <div>
          <div>{name}</div>
          <ItemPrice>{price.toLocaleString()}원</ItemPrice>
        </div>
        {selectedIds.includes(id) && (
          <CheckOutlined style={{ color: theme.colors.purple200 }} />
        )}
      </CartItem>
    ))}
  </ScrollArea>
);

export default DiscountList;

const ScrollArea = styled.div`
  overflow-y: scroll;
  height: 150px;
`;

const CartItem = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.gray100};
  }
`;

const ItemPrice = styled.p`
  margin: 5px 0 0 0;
  color: ${theme.colors.gray300};
  font-size: 14px;
`;
