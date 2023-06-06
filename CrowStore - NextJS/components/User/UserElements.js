import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const UserContainer = styled.div`
  padding: 3rem 0;
  width: 100%;
  height: auto;
  background-color: ${colors.primary};
`;

const SideNavContainer = styled.div`
  background-color: #262626;
  width: 200px;
  height: 100%;
`;

const SideNavItem = styled.div`
  padding: 10px;
  color: #fff;
  cursor: pointer;
`;

export { SideNavContainer, SideNavItem };
