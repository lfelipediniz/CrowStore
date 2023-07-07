import React, { useState } from "react";

import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { BodyContainer } from "./WrapProductElements.jsx";
import ProductDescription from "../ProductDescription"
import {
    ProductContainer,
    ScrollableContainer,
} from "../User/UserElements";
import ProductCard from "../ReusedComponents/ProductCard";
import ProductData from "../../fakedata/usersDatabase/productDetails.json"

const WrapProduct = (productId) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const product = ProductData[1];

    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toggle} home />
            <Navbar toogle={toggle} home />
            <BodyContainer>
                <ProductDescription product={product} />
            </BodyContainer>
            <Footer />
        </>
    );
}

export default WrapProduct