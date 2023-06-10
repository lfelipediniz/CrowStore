import React, { useState } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cart from "../Cart";
import PaymentOptions from "../PaymentOptions"
import { Header, Link } from "./WrapElements.js";

const WrapShopCart = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} home />
            <Navbar toggle={toggle} home />
            <h1>Meu Carrinho</h1>
            <a href="Search Page">≪ Continuar comprando</a>
            <Footer />
        </>
    );
};

export default WrapShopCart;
