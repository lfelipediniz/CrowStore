import React from "react";
import { Link as LinkS } from "react-scroll";
import Link from "next/link";
import {
  SidebarContainer,
  CloseIcon,
  Icon,
  SidebarWrapper,
  SidebarMenu, 
  SidebarItem,
  SidebarItemS,
} from "./SidebarElements";

const Sidebar = ({ isOpen, toggle, home }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {home ? (
            <>
              <LinkS to="showcase" href="#showcase">
                <SidebarItemS onClick={toggle}>Vitrine</SidebarItemS>
              </LinkS>
              <LinkS to="aboutus" href="#aboutus">
                <SidebarItemS onClick={toggle}>Sobre nós</SidebarItemS>
              </LinkS>
              <LinkS to="doubts" href="#doubts">
                <SidebarItemS onClick={toggle}>Dúvidas</SidebarItemS>
              </LinkS>
              <LinkS to="contact" href="#contact">
                <SidebarItemS onClick={toggle}>Contato</SidebarItemS>
              </LinkS>
            </>
          ) : (
            <>
              <Link href="/#showcase">
                <SidebarItem onClick={toggle}>Orçamento</SidebarItem>
              </Link>
              <Link href="/#aboutus">
                <SidebarItem onClick={toggle}>aboutus</SidebarItem>
              </Link>
              <Link href="/#contact">
                <SidebarItem onClick={toggle}>Sobre</SidebarItem>
              </Link>
              <Link href="/#doubts">
                <SidebarItem onClick={toggle}>Dúvidas</SidebarItem>
              </Link>
            </>
          )}
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
