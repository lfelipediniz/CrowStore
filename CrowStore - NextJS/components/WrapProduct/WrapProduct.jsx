import React, { useState } from "react"; (142)

import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { BodyContainer } from "../WrapShopCart/WrapElements";
import {
    ProductContainer,
    ScrollableContainer,
} from "../User/UserElements";
import { ProductData } from "../../fakedata/usersDatabase/productDetails.json"

const WrapProduct = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const product = ProductData[0];

    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toggle} home />
            <Navbar toogle={toggle} home />
            <BodyContainer>
                <Visualizer product={product} />
                {/* <Description product={product} /> */}
                {/* <PurchaceOptions product={product} /> */}
                {/* <ScrollableContainer style={{ marginLeft: 0 }}> */}
                {/*     <ProductContainer> */}
                {/*         {filteredItems.map((product, index) => ( */}
                {/*             <ProductCard */}
                {/*                 key={index} */}
                {/*                 img={product.image} */}
                {/*                 productName={product.productName} */}
                {/*                 price={product.price} */}
                {/*             /> */}
                {/*         ))} */}
                {/*     </ProductContainer> */}
                {/* </ScrollableContainer> */}
            </BodyContainer>
            <Footer />
        </>
    );
}

export default WrapProduct
