import React, { useState } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cart from "../Cart";
import PaymentOptions from "../PaymentOptions";
import { BodyContainer, Header, Link, ShopcartContainer, ProductContainer, PaymentContainer, ShopcartWrapper, Container, } from "./WrapElements.jsx";
import { WrapContent } from "../../components/ReusedComponents/WrapContent"
const WrapShopCart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [cartData, setCartData] = useState({
        Products: [],
        Quantities: [],
        TotalPrice: 0,
    });

    const handleCartUpdate = (products, quantities, totalPrice) => {
        setCartData({
            ...cartData,
            Products: products,
            Quantities: quantities,
            TotalPrice: totalPrice,
        });
    };

    const handleSubmission = (formData) => {
        // Combine cartData and formData
        const combinedData = {
            ...cartData,
            ...formData,
        };
        // Output to console, as a proof of concept
        console.log(combinedData);
        // Save the combined data to a JSON file (once we implement the server)
        // saveDataToFile(combinedData);
    };

    return (
        <>
            <Container>
                <Sidebar isOpen={isOpen} toggle={toggle} home />
                <Navbar toggle={toggle} home />
                <WrapContent>



                    <Header>Meu Carrinho</Header>
                    <Link>≪ Continuar comprando</Link>
                </WrapContent>
                <ShopcartWrapper>
                    <ShopcartContainer>
                        <ProductContainer>
                            <Cart onCartUpdate={handleCartUpdate} />
                        </ProductContainer>
                        <PaymentContainer>
                            <PaymentOptions onSubmit={handleSubmission} />
                        </PaymentContainer>
                    </ShopcartContainer>
                </ShopcartWrapper>
            </Container>
            <Footer />
        </>
    );
};

export default WrapShopCart;
