import React, { useState } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ShowCaseSection from "../ShowCaseSection";

const WrapProduct = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toggle} home />
            <Navbar toogle={toggle} home />
            <ShowCaseSection subtitle="Esta peça combina com"></ShowCaseSection>
            <Footer />
            {/* <DisplayProduct /> */}
        </>
    );
}

export default WrapProduct
