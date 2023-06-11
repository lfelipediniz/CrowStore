import React, { useState } from "react";

import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import BodyContainer from "./WrapProductElements";
// import ProductDescription from "../ProductDescription"
import {
    ProductContainer,
    ScrollableContainer,
} from "../User/UserElements";
import ProductCard from "../ReusedComponents/ProductCard";
import ProductData from "../../fakedata/usersDatabase/productDetails"

const WrapProduct = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    // const product = ProductData[1];
    // console.log(ProductData);

    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toggle} home />
            <Navbar toogle={toggle} home />
            <BodyContainer>
                {/* <ProductDescription product={product} /> */}
                <ScrollableContainer style={{ marginLeft: 0 }}>
                    <ProductContainer>
                        {ProductData.map((product, index) => (
                            <ProductCard
                                key={index}
                                img={product.image}
                                productName={product.productName}
                                price={product.price}
                            />
                        ))}
                    </ProductContainer>
                </ScrollableContainer>
            </BodyContainer>
            <Footer />
        </>
    );
}

export default WrapProduct
