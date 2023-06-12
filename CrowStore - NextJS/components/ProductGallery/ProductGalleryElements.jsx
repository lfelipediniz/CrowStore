import { colors } from "../../styles/colors";
import styled from "styled-components";

export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 104px;
  float: left;

  @media (max-width: 944px) {
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    width: auto;
  }
`;

export const Thumbnail = styled.img`
  width: 104px;
  height: 104px;
  object-fit: cover;
  object-position: center;
  border: ${({ isSelected }) => (isSelected ? "3px" : "1px")} solid
    ${props => (props.isSelected ? colors.ctaHover : colors.primary)};
  margin-right: 16px;
  margin-bottom: 16px;
`;
