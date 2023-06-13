import React, { useState } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import User from "../User";




const WrapUser = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} home />
      <Navbar toggle={toggle} home />
      <User/>
      <Footer />
    </>
  );
};

export default WrapUser; 


