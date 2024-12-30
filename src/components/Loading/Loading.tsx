import styled from "styled-components";
import { Spin } from "antd";

const Loading = () => {
  return (
    <SpinWrap>
      <Spin size="large" />
    </SpinWrap>
  );
};

export default Loading;

const SpinWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
