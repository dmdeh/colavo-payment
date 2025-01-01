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

const Discounts = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const { discounts, loading } = useFetchServices(
    import.meta.env.VITE_COLAVO_DATA
  );

  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);

  if (loading) {
    return <Loading />;
  }

  const toggleSelection = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((selectedItem) => selectedItem !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleComplete = () => {
    if (!discounts) {
      console.error("할인 아이템을 찾을 수 없습니다.");
      return;
    }

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
      }
    });
    navigate(-1);
  };

  if (!discounts) {
    return <div>할인 데이터를 불러오는 중입니다.</div>;
  }

  const isChecked = (key: string) =>
    selected.includes(key) || cartItems.some((item) => item.id === key);

  return (
    <Container>
      <Header>
        <CloseButton onClick={() => navigate(-1)}>
          <CloseOutlined
            style={{ fontSize: "30px", color: theme.colors.gray300 }}
          />
        </CloseButton>
        <Title>시술 메뉴</Title>
        <div></div>
      </Header>
      <Main>
        <ServiceList>
          {Object.entries(discounts).map(([key, { name, rate }]) => {
            return (
              <ServiceItem key={key} onClick={() => toggleSelection(key)}>
                <ServiceTitle>
                  <ServiceName>{name}</ServiceName>
                  <ServiceDetails>{percentage(rate)}%</ServiceDetails>
                </ServiceTitle>
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
              </ServiceItem>
            );
          })}
        </ServiceList>
      </Main>
      <Footer>
        <Message>서비스를 선택하세요. (여러개 선택 가능)</Message>
        <NextButton onClick={handleComplete}>완료</NextButton>
      </Footer>
    </Container>
  );
};

export default Discounts;

const Title = styled.div`
  font-size: 20px;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const ServiceList = styled.div`
  padding: 20px;
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${theme.colors.gray100};
`;

const ServiceTitle = styled.div`
  max-width: 410px;
`;

const ServiceName = styled.div`
  font-size: large;
`;

const ServiceDetails = styled.p`
  margin: 5px 0 0 0;
  color: ${theme.colors.pink200};
`;

const Message = styled.div`
  color: ${theme.colors.purple100};
  margin-bottom: 10px;
`;
