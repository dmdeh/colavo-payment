import styled from "styled-components";
import theme from "../styles/theme";
import { Container, Header, Main, Footer, Message } from "../styles/layout";
import { useNavigate } from "react-router-dom";
import { Button, NextButton } from "../styles/button";
import { ShoppingCartOutlined, PlusCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import CartItem from "../components/CartItem/CartItem";
import { useCartStore } from "../store/useCartStore";
import filterCartItems from "../utils/filterCartItems.ts";
import useFetchServices from "../hooks/useFetchServices.ts";
import PriceFormatter from "../components/Common/PriceFormatter/PriceFormatter.tsx";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const getTotal = useCartStore((state) => state.getTotal);

  const { currencyCode } = useFetchServices(import.meta.env.VITE_COLAVO_DATA);

  return (
    <Container>
      <CartHeader>
        <ShoppingCartOutlined style={{ fontSize: "20px" }} />
        <HeaderTitle>장바구니</HeaderTitle>
      </CartHeader>
      <Main>
        <MenuContainer>
          <MenuButton $menu="services" onClick={() => navigate("/services")}>
            <PlusCircleOutlined /> <span>시술</span>
          </MenuButton>
          <MenuButton $menu="discounts" onClick={() => navigate("/discounts")}>
            <PlusCircleOutlined /> <span>할인</span>
          </MenuButton>
        </MenuContainer>
        <CartList>
          {cartItems.length > 0 ? (
            Object.entries(cartItems).map(([key, item]) => (
              <CartItem
                key={key}
                item={item}
                serviceItems={
                  item.type === "discounts"
                    ? filterCartItems(cartItems, "services")
                    : undefined
                }
              />
            ))
          ) : (
            <Message>
              <PlusSquareOutlined style={{ fontSize: "30px" }} />
              <h3>아이템을 선택하세요</h3>
            </Message>
          )}
        </CartList>
      </Main>
      <Footer>
        <TotalRow>
          <TotalLabel>합계</TotalLabel>
          <PriceFormatter amount={getTotal()} currencyCode={currencyCode} />
        </TotalRow>
        <NextButton>다음</NextButton>
      </Footer>
    </Container>
  );
};

export default Cart;

const CartHeader = styled(Header)`
  gap: 10px;
  justify-content: unset;
  padding-bottom: 0;
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const MenuContainer = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
  border-bottom: 1px dashed ${theme.colors.gray200};
`;

const MenuButton = styled(Button)<{ $menu: string }>`
  background-color: ${({ $menu }) =>
    $menu === "discounts" ? theme.colors.pink100 : theme.colors.gray100};
  color: ${({ $menu }) =>
    $menu === "discounts" ? theme.colors.pink200 : theme.colors.gray300};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 18px;
`;

const CartList = styled.div`
  padding: 10px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalLabel = styled.span`
  color: ${theme.colors.gray300};
  font-size: 18px;
`;
