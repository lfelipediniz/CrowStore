import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaSearch,
  FaUserAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  ImgWrap,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItems,
  NavLinks,
  NavLink,
} from "./NavbarElements";
import Logo from "../../public/CrowStore/logos/logo-crow-512x512.png";
import { colors } from "../../styles/colors.js";

const Navbar = ({ toggle, navbarColor }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 60) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  const checkHomePage = () => {
    setIsHomePage(window.location.pathname === "/");
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    checkHomePage();

    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: colors.textBlack }}>
        <Nav navbarColor={navbarColor} scrollNav={scrollNav}>
          <NavbarContainer>
            <ImgWrap>
              <NavLogo
                to="/"
                href="/"
                onClick={toggleHome}
                src={Logo}
                alt="Logo CROW"
              />
            </ImgWrap>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              {isHomePage && (
                <>
                  <NavItems>
                    <NavLinks
                      to="showcase"
                      href="#showcase"
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact="true"
                      offset={-60}
                    >
                      Vitrine
                    </NavLinks>
                  </NavItems>
                  <NavItems>
                    <NavLinks
                      to="aboutus"
                      href="#aboutus"
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact="true"
                      offset={-60}
                    >
                      Sobre nós
                    </NavLinks>
                  </NavItems>
                  <NavItems>
                    <NavLinks
                      to="doubts"
                      href="#doubts"
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact="true"
                      offset={-60}
                    >
                      Dúvidas
                    </NavLinks>
                  </NavItems>
                </>
              )}
              <NavItems>
                <NavLinks
                  to="contact"
                  href="#contact"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-60}
                >
                  <FaSearch color="#FFFBFE" />
                </NavLinks>
              </NavItems>
              <NavItems>
                <NavLinks
                  to="contact"
                  href="#contact"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-60}
                  style={{
                    boxShadow: "0 0 5px #FFFBFE",
                  }}
                >
                  <FaShoppingCart color="#FFFBFE" />
                </NavLinks>
              </NavItems>
              <NavItems>
                <Link href="/login">
                  <NavLink>
                    <FaUserAlt color="#FFFBFE" />
                  </NavLink>
                </Link>
              </NavItems>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
