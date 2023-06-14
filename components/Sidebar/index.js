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
          <Link href="/">
            <SidebarItem onClick={toggle}>Home</SidebarItem>
          </Link>

          <Link href="/user">
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
