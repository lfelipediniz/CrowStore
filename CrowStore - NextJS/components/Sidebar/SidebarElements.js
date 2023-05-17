import styled from "styled-components";

import { FaTimes } from "react-icons/fa";
import { colors } from "../../styles/colors";
import {fonts} from "../../styles/fonts"

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: ${colors.primary};
  display: ${({ isOpen }) => (isOpen ? "grid" : "none")};
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

export const CloseIcon = styled(FaTimes)`
  color: ${colors.textBlack};
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: ${fonts.text};
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: ${colors.textBlack};
`;

export const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 80px);
  }
`;

export const SidebarItem = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fonts.text};
  font-weight: 600;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: ${colors.textBlack};
  cursor: pointer;

  &:hover {
    color: ${colors.secondary};
    transition: 0.2s ease-in-out;
  }
`;

export const SidebarItemS = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fonts.text};
  font-weight: 600;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: ${colors.textBlack};
  cursor: pointer;

  &:hover {
    color: ${colors.secondary};
    transition: 0.2s ease-in-out;
  }
`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const SidebarRoute = styled.a`
  border-radius: 50px;
  background: ${colors.cta};
  white-space: nowrap;
  padding: 16px 64px;
  color: ${colors.primary};
  font-size: ${fonts.text};
  font-weight: 600;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${colors.textBlack};
    color: ${colors.primary};
  }
`;
