import styled from "styled-components";
import theme from "./theme";

export const Title = styled.div`
  font-size: 20px;
`;

export const CloseIcon = styled.div`
  position: absolute;
  padding-left: 10px;
  left: 0;
  color: ${theme.colors.gray300};
`;

export const CloseButton = styled.div`
  cursor: pointer;
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${theme.colors.gray100};
`;

export const DetailMessage = styled.div`
  color: ${theme.colors.purple100};
  margin-bottom: 10px;
  text-align: center;
`;
