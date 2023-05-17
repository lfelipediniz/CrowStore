import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import HeroSection from "../HeroSection";
import FAQ from "../FAQSection";
import ContactSection from "../ContactSection";
import Footer from "../Footer";
import AboutUSSection from "../AboutUSSection";
import ShowCaseSection from "../ShowCaseSection";

const Wrap = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} home />
      <Navbar toggle={toggle} home />
 
      <HeroSection></HeroSection>
      <ShowCaseSection></ShowCaseSection>
      <AboutUSSection />
      <FAQ />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Wrap;
