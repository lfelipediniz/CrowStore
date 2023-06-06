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

export const SideNavContainer = styled.div`
  background-color: #262626;
  width: 276px;
  height: 100%;
`;

export const SideNavItem = styled.div`
  padding: 10px;
  color: ${colors.primary};
  cursor: pointer;
`;
