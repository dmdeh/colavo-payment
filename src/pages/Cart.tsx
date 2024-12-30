import styled from "styled-components";
import theme from "../styles/theme";
import { Container, Header, Main, Footer } from "../styles/layout";

const Cart = () => {
  return (
    <Container>
      <Header>
        <HeaderTitle>장바구니</HeaderTitle>
      </Header>
      <Main>
        <MenuContainer>
          <MenuButton $menu="items">+ 시술 추가</MenuButton>
          <MenuButton $menu="discounts">+ 할인 추가</MenuButton>
        </MenuContainer>
        {/* item */}
      </Main>
      <Footer>
        <Total>
          <TotalRow>
            <TotalLabel>합계</TotalLabel>
            <TotalAmount>0원</TotalAmount>
          </TotalRow>
          <NextButton>다음</NextButton>
        </Total>
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
  background-color: ${({ $menu: menu }) =>
    menu === "discounts" ? theme.colors.pink100 : theme.colors.gray100};
  color: ${({ $menu: menu }) =>
    menu === "discounts" ? theme.colors.pink200 : theme.colors.gray300};
  border: none;
  border-radius: 20px;
  display: flex;
  justify-content: center;
`;

const Total = styled.div`
  margin: 10px;
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

const TotalAmount = styled.span`
  font-size: x-large;
`;

const NextButton = styled.button`
  width: 100%;
  background-color: ${theme.colors.purple200};
  color: white;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
`;
