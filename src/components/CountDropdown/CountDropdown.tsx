import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Space } from "antd";
import styled from "styled-components";
import theme from "../../styles/theme";

interface CountDropdownProps {
  children: React.ReactNode;
  title: string;
  delete: () => void;
  complete: (count: number) => void;
}

const CountDropdown = ({
  children,
  title,
  delete: handleDelete,
  complete,
}: CountDropdownProps) => {
  const [count, setCount] = useState(Number(children));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCount(Number(children));
  }, [children]);

  const handleMenuClick = (newCount: number) => {
    setCount(newCount);
  };

  const handleCompleteClick = () => {
    complete(count);
    setIsOpen(false);
  };

  const dropdownContent = (
    <DropdownContainer>
      <Title>{title}</Title>
      <Divider style={{ margin: "8px 0 0 0" }} />
      <ScrollArea>
        {Array.from({ length: 10 }, (_, i) => (
          <ScrollItem
            key={i + 1}
            onClick={(e) => {
              e.stopPropagation();
              handleMenuClick(i + 1);
            }}
          >
            {i + 1}
          </ScrollItem>
        ))}
      </ScrollArea>
      <Divider style={{ margin: "0 0 0 8px" }} />
      <ButtonBox>
        <Button
          type="text"
          style={{ padding: "0 30px" }}
          danger
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
            setIsOpen(false);
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
            handleCompleteClick();
          }}
        >
          완료
        </Button>
      </ButtonBox>
    </DropdownContainer>
  );

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      open={isOpen}
      onOpenChange={setIsOpen}
      dropdownRender={() => dropdownContent}
    >
      <Button type="text" size="small">
        <Space>
          {count}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default CountDropdown;

const DropdownContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 6px 16px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px;
  padding: 10px;
  width: 200px;
`;

const Title = styled.div`
  padding: 5px;
`;

const ScrollArea = styled.div`
  overflow-y: scroll;
  height: 150px;
`;

const ScrollItem = styled.div`
  border-bottom: 1px solid ${theme.colors.gray100};
  padding: 8px;
  text-align: center;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${theme.colors.gray100};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
