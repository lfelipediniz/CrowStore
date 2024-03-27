import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { BodyContainer } from "./WrapProductElements.jsx";
import ProductDescription from "../ProductDescription";
import { ProductContainer, ScrollableContainer } from "../User/UserElements";
import ProductCard from "../ReusedComponents/ProductCard";
import { colors } from "../../styles/colors";

const WrapProduct = ({ productName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/products/getProductByName/${productName}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productName]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: colors.primary }}>
      <Sidebar isOpen={isOpen} toggle={toggle} home />
      <Navbar toggle={toggle} home />
      <BodyContainer>
        <ProductDescription product={product} />
      </BodyContainer>
      <Footer />
    </div>
  );
};

export default WrapProduct;
