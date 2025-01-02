import styled from "styled-components";
import theme from "../styles/theme";
import { Container, Header, Main, Footer, Message } from "../styles/layout";
import { useNavigate } from "react-router-dom";
import { NextButton } from "../styles/button";
import { PlusCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
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
      <Header>
        <HeaderTitle>장바구니</HeaderTitle>
      </Header>
      <Main>
        <MenuContainer>
          <MenuButton $menu="services" onClick={() => navigate("/services")}>
            <PlusCircleOutlined /> 시술
          </MenuButton>
          <MenuButton $menu="discounts" onClick={() => navigate("/discounts")}>
            <PlusCircleOutlined /> 할인
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

const HeaderTitle = styled.h1`
  font-size: 1.125rem;
  font-weight: 600;
`;

const MenuContainer = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
  border-bottom: 1px dashed ${theme.colors.gray200};
`;

const MenuButton = styled.button<{ $menu: string }>`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  background-color: ${({ $menu }) =>
    $menu === "discounts" ? theme.colors.pink100 : theme.colors.gray100};
  color: ${({ $menu }) =>
    $menu === "discounts" ? theme.colors.pink200 : theme.colors.gray300};
  border: none;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const CartList = styled.div`
  padding: 10px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TotalLabel = styled.span`
  color: ${theme.colors.gray300};
`;
