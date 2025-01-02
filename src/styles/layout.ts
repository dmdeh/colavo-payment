import styled from "styled-components";
import theme from "./theme";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const Main = styled.main`
  flex: 1;
  overflow: auto;
`;

export const Footer = styled.footer`
  border-top: 1px solid ${theme.colors.gray200};
  align-content: center;
  height: 140px;
  position: sticky;
  padding: 0 10px;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #b6c3cb;
  align-items: center;
`;
