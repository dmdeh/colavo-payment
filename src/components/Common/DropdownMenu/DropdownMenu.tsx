import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Space } from "antd";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { ServiceItem } from "../../../types/CartType";
import { ButtonGroup, DiscountList, ServiceList } from "./List";

interface DropdownMenuProps {
  children: React.ReactNode;
  title: string;
  type: "services" | "discounts";
  delete: () => void;
  complete: (count: number) => void;
  serviceItems?: ServiceItem[];
  completeDiscount?: (selectedIds: string[]) => void;
}

const DropdownMenu = ({
  children,
  title,
  type,
  delete: handleDelete,
  complete,
  serviceItems = [],
  completeDiscount,
}: DropdownMenuProps) => {
  const [count, setCount] = useState(Number(children));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (type === "services") {
      setCount(Number(children));
    }
  }, [children, type]);

  useEffect(() => {
    if (type === "discounts") {
      setSelectedServices(serviceItems.map((item) => item.id));
    }
  }, [type]);

  const handleMenuClick = (newCount: number) => setCount(newCount);

  const handleServiceSelect = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices((prev) => prev.filter((id) => id !== serviceId));
    } else {
      setSelectedServices((prev) => [...prev, serviceId]);
    }
  };

  const handleCompleteClick = () => {
    if (type === "services") {
      complete(count);
    } else if (completeDiscount) {
      completeDiscount(selectedServices);
    }
    setIsOpen(false);
  };

  const renderContent = () => (
    <DropdownContainer>
      <Title>{title}</Title>
      <Divider style={{ margin: "8px 0 0 0" }} />
      {type === "services" ? (
        <ServiceList onSelect={handleMenuClick} />
      ) : (
        <DiscountList
          items={serviceItems}
          selectedIds={selectedServices}
          onSelect={handleServiceSelect}
        />
      )}
      <Divider style={{ margin: "0 0 8px 0" }} />
      <ButtonGroup
        onDelete={() => {
          handleDelete();
          setIsOpen(false);
        }}
        onComplete={handleCompleteClick}
      />
    </DropdownContainer>
  );

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      open={isOpen}
      onOpenChange={setIsOpen}
      dropdownRender={renderContent}
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

export default DropdownMenu;

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

const ButtonTitle = styled.p`
  color: ${theme.colors.gray300};
`;
