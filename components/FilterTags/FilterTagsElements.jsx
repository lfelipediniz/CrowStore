import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Filter = styled.div`
  box-sizing: border-box;
  margin: 1em auto 0;
  width: calc(100% - (2 * 64px));
  clear: both;
`;

export const Title = styled.p`
  font-family: Inter, sans-serif;
  font-size: 1em;
  line-height: 1.5em;
  box-sizing: border-box;
  font-weight: 500;
  text-transform: uppercase;
  float: left;
  padding: 1px 6px 1px 0;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const TagList = styled.ul`
  list-style: none;
  padding-left: 0px;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Tag = styled.li`
  margin: 0 0.5em 0.5em 0;
  float: left;
`;

export const WebButton = styled.button`
  font-family: Inter, sans-serif;
  font-size: 1em;
  line-height: 1.5em;
  box-sizing: border-box;
  background-color: white;
  padding: 1px 6px;
  border: 1px solid black;

  &.selected {
    color: #e71d36;
    border: 1px solid #e71d36;
  }
`;

export const MobileFilter = styled.div`
  @media (min-width: 900px) {
    display: none;
  }

`;

export const ContainerModal = styled.div`
    background-color: ${colors.secondary};
    color: ${colors.primary};
    width: 200px;
`
