import styled from "styled-components";
import theme from "../styles/theme";
import { Container, Header, Main, Footer } from "../styles/layout";
import { useNavigate } from "react-router-dom";
import { NextButton } from "../styles/button";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import useFetchServices from "../hooks/useFetchServices";
import Loading from "../components/Loading/Loading";
import useCart from "../hooks/useCart";

const Services = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const { items, loading } = useFetchServices(import.meta.env.VITE_COLAVO_DATA);
  const { cartItems, addToCart } = useCart();

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
    if (!items) {
      console.error("아이템을 찾을 수 없습니다.");
      return;
    }

    selected.forEach((id) => {
      const item = items[id];
      if (item) {
        addToCart({
          id, name: item.name, price: item.price, type: "services", count: item.count
        });
      }
    });
    navigate(-1);
  };

  if (!items) {
    return <div>서비스 데이터를 불러오는 중입니다.</div>;
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
          {Object.entries(items).map(([key, { name, price }]) => {
            return (
              <ServiceItem key={key} onClick={() => toggleSelection(key)}>
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

export default Services;

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
  color: ${theme.colors.gray300};
  font-size: 14px;
`;

const Message = styled.div`
  color: ${theme.colors.purple100};
  margin-bottom: 10px;
`;
