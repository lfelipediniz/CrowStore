import React, { useState } from "react"; (142)

import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ShowCaseSection from "../ShowCaseSection";
import { BodyContainer } from "../WrapShopCart/WrapElements";

const WrapProduct = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toggle} home />
            <Navbar toogle={toggle} home />
            <BodyContainer>
                <Visualizer product={product} />
                <Description product={product} />
                <PurchaceOptions product={product} />
                <ScrollableContainer style={{ marginLeft: 0 }}>
                    <ProductContainer>
                        {filteredItems.map((product, index) => (
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
