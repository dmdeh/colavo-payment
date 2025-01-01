import React, { useState, useEffect } from "react";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Space } from "antd";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { ServiceItem } from "../../../types/CartType";

interface CountDropdownProps {
  children: React.ReactNode;
  title: string;
  type: "services" | "discounts";
  delete: () => void;
  complete: (count: number) => void;
  serviceItems?: ServiceItem[];
}

const CountDropdown = ({
  children,
  title,
  type,
  delete: handleDelete,
  complete,
  serviceItems = [],
}: CountDropdownProps) => {
  const [count, setCount] = useState(Number(children) || 0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (type === "services") {
      setCount(Number(children));
    }
  }, [children, type]);

  useEffect(() => {
    if (type === "discounts" && serviceItems.length > 0) {
      setSelectedServices(serviceItems.map((item) => item.id));
    }
  }, [type, serviceItems]);

  const handleMenuClick = (newCount: number) => {
    setCount(newCount);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleCompleteClick = () => {
    if (type === "services") {
      complete(count);
    } else {
      complete(selectedServices.length);
    }
    setIsOpen(false);
  };

  const isChecked = (id: string) => selectedServices.includes(id);

  const renderDropdownContent = () => {
    if (type === "services") {
      return (
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
      );
    }

    return (
      <CartList>
        {serviceItems.map(({ id, name, price }) => (
          <CartItem key={id}>
            <ServiceItemWrapper
              onClick={(e) => {
                e.stopPropagation();
                handleServiceSelect(id);
              }}
            >
              <div>
                <div>{name}</div>
                <ItemPrice>{price.toLocaleString()}원</ItemPrice>
              </div>
              {isChecked(id) && (
                <CheckOutlined style={{ color: theme.colors.purple200 }} />
              )}
            </ServiceItemWrapper>
          </CartItem>
        ))}
      </CartList>
    );
  };

  const dropdownContent = (
    <DropdownContainer>
      <Title>{title}</Title>
      <Divider style={{ margin: "8px 0 0 0" }} />
      {renderDropdownContent()}
      <Divider style={{ margin: "0 0 8px 0" }} />
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
      <Button
        type="text"
        style={{
          backgroundColor: theme.colors.gray100,
          borderRadius: "20px",
          padding: "13px",
        }}
      >
        <Space style={{ columnGap: "5px" }}>
          <ButtonTitle>{type === "services" ? count : "수정"}</ButtonTitle>
          <DownOutlined
            style={{ fontSize: "10px", color: theme.colors.gray300 }}
          />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default CountDropdown;

const CartList = styled.div`
  overflow-y: auto;
  padding: 8px;
  overflow-y: scroll;
  height: 150px;
`;

const CartItem = styled.div`
  padding: 8px 0;
  &:hover {
    background-color: ${theme.colors.gray100};
  }
`;

const ServiceItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

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
    font-size: large;
  }
`;

const ItemPrice = styled.p`
  margin: 5px 0 0 0;
  color: ${theme.colors.gray300};
  font-size: 14px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ButtonTitle = styled.p`
  color: ${theme.colors.gray300};
`;
