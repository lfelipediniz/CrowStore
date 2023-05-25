import styled from "styled-components";
import Image from "next/image";
import { Link as LinkS } from "react-scroll";

import { colors } from "../../styles/colors";

export const Nav = styled.nav`
  background: rgba(38, 38, 38, 0.50);
  height: 60px;
  margin-top: -60px;
  margin-top: ${({ navbarColor }) => (navbarColor ? "0px" : "-60px")};
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 1000px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin: 0 25px;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
`;

export const ImgWrap = styled.div`
  max-width: 200px;
  height: 100%;
`;

export const NavLogo = styled(Image)`
  justify-self: flex-start;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 60px;
  height: 60px;

  @media screen and (max-width: 1000px) {
    width: 50px;
    height: 50px;
    margin-top: 8px;
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 900px) {
    display: flex;
    font-size: 1.8rem;
    cursor: pointer;
    color: ${colors.textBlack};
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  top: 0;
  right: 0;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const NavItems = styled.li`
  height: 60px;
  flex-grow: 1;
  a {
    text-decoration: none;
  }
`;

export const NavLinks = styled(LinkS)`
  color: ${colors.primary};
  display: flex;
  text-decoration: none;
  padding: 1.3rem 2.5rem;
  height: 100%;
  cursor: pointer;
  font-weight: 600;

  &.active {
    border-bottom: 3px solid ${colors.cta};
  }
`;

export const NavBtn = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const NavBtnLink = styled.a`
  text-decoration: none;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  background: ${colors.cta};
  font-size: 25px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${colors.cta};
    color: ${colors.primary};
  }
`;
