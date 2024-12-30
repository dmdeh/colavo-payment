import styled from "styled-components";
import theme from "../styles/theme";
import { Container, Header, Main, Footer } from "../styles/layout";
import { useNavigate } from "react-router-dom";
import { NextButton } from "../styles/button";

const Services = () => {
  const navigate = useNavigate();
  const services = [
    {
      i_1: {
        count: 1,
        name: "여성컷",
        price: 35000,
      },
      i_2: {
        count: 1,
        name: "남성컷",
        price: 30000,
      },
      i_3: {
        count: 1,
        name: "드라이",
        price: 30000,
      },
      i_4: {
        count: 1,
        name: "기본펌",
        price: 100000,
      },
    },
  ];

  return (
    <Container>
      <Header>
        <CloseButton onClick={() => navigate(-1)}>X</CloseButton>
      </Header>
      <Main>
        <ServiceList>
          {services.map((serviceGroup) =>
            Object.entries(serviceGroup).map(([key, { name, price }]) => (
              <ServiceItem key={key}>
                <div>
                  <ServiceName>{name}</ServiceName>
                  <ServiceDetails>{price.toLocaleString()}원</ServiceDetails>
                </div>
                <Checkbox id={key} type="checkbox" />
              </ServiceItem>
            ))
          )}
        </ServiceList>
      </Main>
      <Footer>
        <Message>서비스를 선택하세요. (여러개 선택 가능)</Message>
        <NextButton onClick={() => navigate(-1)}>완료</NextButton>
      </Footer>
    </Container>
  );
};

export default Services;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
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

const ServiceName = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const ServiceDetails = styled.p`
  margin: 5px 0 0 0;
  color: ${theme.colors.gray300};
  font-size: 14px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

const Message = styled.div`
  color: ${theme.colors.purple100};
  margin-bottom: 10px;
`;
