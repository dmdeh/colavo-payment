import styled from "styled-components";
import theme from "./theme";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Main = styled.main`
  flex: 1;
  overflow: auto;
`;

export const Footer = styled.footer`
  border-top: 1px solid ${theme.colors.gray200};
  align-content: center;
  height: 120px;
  position: sticky;
`;
