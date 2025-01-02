import { Button, Divider } from "antd";
import styled from "styled-components";

interface ButtonGroupProps {
  onDelete: () => void;
  onComplete: () => void;
}

const ButtonGroup = ({ onDelete, onComplete }: ButtonGroupProps) => (
  <ButtonBox>
    <Button
      type="text"
      style={{ padding: "0 30px" }}
      danger
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
    >
      삭제
    </Button>
    <Divider type="vertical" style={{ height: "30px" }} />
    <Button
      type="text"
      style={{ padding: "0 30px" }}
      onClick={(e) => {
        e.stopPropagation();
        onComplete();
      }}
    >
      완료
    </Button>
  </ButtonBox>
);

export default ButtonGroup;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
