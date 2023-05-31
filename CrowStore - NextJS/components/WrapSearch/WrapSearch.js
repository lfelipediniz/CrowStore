import React, { useState } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const WrapSearch = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} home />
      <Navbar toggle={toggle} home />
      
      <Footer />
    </>
  );
};

export default WrapSearch;
