import { colors } from "../../styles/colors";
import styled from "styled-components";

export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 104px;
  height: inherit;
  float: left;

  @media (max-width: 944px) {
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: auto;
  }
`;

export const Thumbnail = styled.img`
  width: 104px;
  height: auto;
  border: 1px solid ${props => (props.isSelected ? colors.ctaHover : colors.primary)};

  @media (max-width: 944px) {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;
