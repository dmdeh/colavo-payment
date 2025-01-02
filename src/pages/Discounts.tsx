import styled from "styled-components";
import theme from "../styles/theme";
import { Container, Header, Main, Footer } from "../styles/layout";
import { useNavigate } from "react-router-dom";
import { NextButton } from "../styles/button";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import useFetchServices from "../hooks/useFetchServices";
import Loading from "../components/Common/Loading/Loading";
import { useCartStore } from "../store/useCartStore";
import { percentage } from "../utils/calculate";
import { CloseButton, CloseIcon, DetailMessage, ListItem, Title } from "../styles/page";

const Discounts = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const { discounts, loading } = useFetchServices(
    import.meta.env.VITE_COLAVO_DATA
  );

  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateSelectedIds = useCartStore((state) => state.updateSelectedIds);

  const getServiceItemIds = () =>
    cartItems.filter((item) => item.type === "services").map((item) => item.id);

  if (loading) return <Loading />;
  if (!discounts) {
    return <div>할인 데이터를 불러오는 중입니다.</div>;
  }

  const toggleSelection = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((selectedItem) => selectedItem !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleComplete = () => {
    selected.forEach((id) => {
      const discount = discounts[id];
      if (discount) {
        addToCart({
          id,
          name: discount.name,
          type: "discounts",
          rate: discount.rate,
          selectedIds: discount.selectedIds,
        });
        updateSelectedIds(id, getServiceItemIds());
      }
    });
    navigate(-1);
  };

  const isChecked = (key: string) =>
    selected.includes(key) || cartItems.some((item) => item.id === key);

  return (
    <Container>
      <Header>
        <CloseIcon>
          <CloseButton onClick={() => navigate(-1)}>
            <CloseOutlined style={{ fontSize: "30px" }} />
          </CloseButton>
        </CloseIcon>
        <Title>시술 메뉴</Title>
      </Header>
      <Main>
        <DiscountList>
          {Object.entries(discounts).map(([key, { name, rate }]) => {
            return (
              <ListItem key={key} onClick={() => toggleSelection(key)}>
                <DiscountTitle>
                  <DiscountName>{name}</DiscountName>
                  <DiscountDetails>{percentage(rate)}%</DiscountDetails>
                </DiscountTitle>
                <div>
                  {isChecked(key) && (
                    <CheckOutlined
                      style={{
                        fontSize: "30px",
                        color: theme.colors.purple200,
                      }}
                    />
                  )}
                </div>
              </ListItem>
            );
          })}
        </DiscountList>
      </Main>
      <Footer>
        <DetailMessage>서비스를 선택하세요. (여러개 선택 가능)</DetailMessage>
        <NextButton onClick={handleComplete}>완료</NextButton>
      </Footer>
    </Container>
  );
};

export default Discounts;

const DiscountList = styled.div`
  padding: 20px;
`;

const DiscountTitle = styled.div`
  max-width: 410px;
`;

const DiscountName = styled.div`
  font-size: large;
`;

const DiscountDetails = styled.p`
  margin: 5px 0 0 0;
  color: ${theme.colors.pink200};
`;
