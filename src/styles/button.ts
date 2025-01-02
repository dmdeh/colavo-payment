import styled from "styled-components";
import theme from "./theme";

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export const NextButton = styled(Button)`
  background-color: ${theme.colors.purple200};
  color: white;
  font-weight: 600;
  font-size: large;
`;
