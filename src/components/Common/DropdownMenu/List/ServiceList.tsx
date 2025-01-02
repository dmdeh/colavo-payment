import styled from "styled-components";
import theme from "../../../../styles/theme";

const MAX_SERVICE_COUNT = 10;

interface ServiceListProps {
  onSelect: (count: number) => void;
}

const ServiceList = ({ onSelect }: ServiceListProps) => (
  <ScrollArea>
    {Array.from({ length: MAX_SERVICE_COUNT }, (_, i) => (
      <ScrollItem
        key={i + 1}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(i + 1);
        }}
      >
        {i + 1}
      </ScrollItem>
    ))}
  </ScrollArea>
);

export default ServiceList;

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
