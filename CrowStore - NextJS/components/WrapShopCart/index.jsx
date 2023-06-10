import React, { useState } from "react";
import fs from "fs";
import path from "path";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cart from "../Cart";
import PaymentOptions from "../PaymentOptions"
import { BodyContainer, Header, Link } from "./WrapElements.jsx";

const WrapShopCart = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [cartData, setCartData] = useState({
        Products: [],
        Quantities: [],
        TotalPrice: 0,
    })

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
        // Save the combined data to a JSON file
        saveDataToFile(combinedData);
        // Perform additional actions with the form data as needed
    };

    const saveDataToFile = (data) => {
        const filePath = path.join(__dirname, "../../fakedata/usersDatabase/order.json");
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                console.error("Error saving data to file:", err);
            } else {
                console.log("Data saved to file successfully.");
            }
        });
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} home />
            <Navbar toggle={toggle} home />
            <BodyContainer>
                <Header>Meu Carrinho</Header>
                <Link>≪ Continuar comprando</Link>
                <Cart onCartUpdate={handleCartUpdate} />
                <PaymentOptions onSubmit={handleSubmission} />
            </BodyContainer>
            <Footer />
        </>
    );
};

export default WrapShopCart;
