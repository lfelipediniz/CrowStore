import React, { useState } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cart from "../Cart";
// import PaymentOptions from "../PaymentOptions"
import { BodyContainer, Header, Link } from "./WrapElements.jsx";

const WrapShopCart = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} home />
            <Navbar toggle={toggle} home />
            <BodyContainer>
                <Header>Meu Carrinho</Header>
                <Link>≪ Continuar comprando</Link>
                <Cart />
                {/* <PaymentOptions /> */}
            </BodyContainer>
            <Footer />
        </>
    );
};

export default WrapShopCart;
