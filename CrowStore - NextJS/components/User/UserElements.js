import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const UserContainer = styled.div`
  display: flex;
  padding: 3rem 0;
  margin-top: 80px;
  width: 100%;
  height: 90vh;
  background-color: ${colors.primary};
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
`;
