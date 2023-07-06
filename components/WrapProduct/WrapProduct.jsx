import React, { useState } from "react";

import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { BodyContainer } from "./WrapProductElements.jsx";
import ProductDescription from "../ProductDescription";

const WrapProduct = ({ productName }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} home />
            <Navbar toggle={toggle} home />
            <BodyContainer>
                <ProductDescription productName={productName} />
            </BodyContainer>
            <Footer />
        </>
    );
};

export default WrapProduct;
