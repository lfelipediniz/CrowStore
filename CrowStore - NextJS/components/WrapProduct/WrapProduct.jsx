import React, { useState } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const WrapProduct = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toggle} home />
            <Navbar toogle={toggle} home />
            <Footer />
            <DisplayProduct />
            <ShowCaseSection></ShowCaseSection>
        </>
    );
}

export default WrapProduct
