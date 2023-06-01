import React, { useEffect, useState } from "react";
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

const Sidebar = ({ isOpen, toggle }) => {
  const [isHomePage, setIsHomePage] = useState(false);

  const checkHomePage = () => {
    setIsHomePage(router.pathname === "/");
  };

  const toggleHome = () => {
    scroll.scrollToTop();
    router.push("/");
  };

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {isHomePage ? (
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
            </>
          ) : (
            <>
              <Link href="/#showcase">
                <SidebarItem onClick={toggle}>Orçamento</SidebarItem>
              </Link>
              <Link href="/#aboutus">
                <SidebarItem onClick={toggle}>aboutus</SidebarItem>
              </Link>
              <Link href="/#doubts">
                <SidebarItem onClick={toggle}>Dúvidas</SidebarItem>
              </Link>
            </>
          )}

          <Link href="/login">
            <SidebarItemS onClick={toggle}>Meu Perfil</SidebarItemS>
          </Link>
          <Link href="/shopcart">
            <SidebarItemS onClick={toggle}>Meu Carrinho</SidebarItemS>
          </Link>
          <Link href="/search">
            <SidebarItemS onClick={toggle}>Pesquisar Produto</SidebarItemS>
          </Link>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
