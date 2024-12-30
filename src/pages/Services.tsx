import styled from "styled-components";
import theme from "../styles/theme";
import { Container, Header, Main, Footer } from "../styles/layout";
import { useNavigate } from "react-router-dom";
import { NextButton } from "../styles/button";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import useFetchServices from "../hooks/useFetchServices";

const Services = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const { items, loading } = useFetchServices(import.meta.env.VITE_COLAVO_DATA);

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleSelection = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((selectedItem) => selectedItem !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

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
          {Object.entries(items.items).map(([key, { name, price }]) => (
            <ServiceItem key={key} onClick={() => toggleSelection(key)}>
              <div>
                <ServiceName>{name}</ServiceName>
                <ServiceDetails>{price.toLocaleString()}원</ServiceDetails>
              </div>
              {selected.includes(key) && (
                <CheckOutlined
                  style={{ fontSize: "30px", color: theme.colors.purple200 }}
                />
              )}
            </ServiceItem>
          ))}
        </ServiceList>
      </Main>
      <Footer>
        <Message>서비스를 선택하세요. (여러개 선택 가능)</Message>
        <NextButton
          onClick={() =>
            navigate("/cart", { state: { selectedItems: selected } })
          }
        >
          완료
        </NextButton>
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
