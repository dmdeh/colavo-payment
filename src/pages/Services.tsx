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
import { CloseButton, CloseIcon, DetailMessage, ListItem, Title } from "../styles/page";

const Services = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const { items, loading } = useFetchServices(import.meta.env.VITE_COLAVO_DATA);

  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);

  if (loading) return <Loading />;
  if (!items) {
    return <div>서비스 데이터를 불러오는 중입니다.</div>;
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
      const item = items[id];
      if (item) {
        addToCart({
          id,
          name: item.name,
          price: item.price,
          type: "services",
          count: item.count,
        });
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
        <ServiceList>
          {Object.entries(items).map(([key, { name, price }]) => {
            return (
              <ListItem key={key} onClick={() => toggleSelection(key)}>
                <ServiceTitle>
                  <ServiceName>{name}</ServiceName>
                  <ServiceDetails>{price.toLocaleString()}원</ServiceDetails>
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
              </ListItem>
            );
          })}
        </ServiceList>
      </Main>
      <Footer>
        <DetailMessage>서비스를 선택하세요. (여러개 선택 가능)</DetailMessage>
        <NextButton onClick={handleComplete}>완료</NextButton>
      </Footer>
    </Container>
  );
};

export default Services;

const ServiceList = styled.div`
  padding: 20px;
`;

const ServiceTitle = styled.div`
  max-width: 410px;
`;

const ServiceName = styled.div`
  font-size: large;
`;

const ServiceDetails = styled.p`
  margin: 5px 0 0 0;
  color: ${theme.colors.gray300};
`;
