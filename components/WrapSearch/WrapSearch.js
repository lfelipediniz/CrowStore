import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import FilterTags from "../FilterTags";
import {
  ProductContainer,
  ScrollableContainer,
} from "../User/UserElements";
import ProductCard from "../ReusedComponents/ProductCard";
import { Subtitle } from "./WrapElements";

const WrapSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const modifyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const modifySearchTerm = (newTerm) => {
    setSearchTerm(newTerm);
  };

  useEffect(() => {
    const fetchFilteredItems = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/products/filterProducts",
          { name: searchTerm }
        );
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Erro ao filtrar os produtos:", error);
        setFilteredItems([]);
      }
    };

    fetchFilteredItems();
  }, [searchTerm]);

  useEffect(() => {
    const filteredItemsWithFilters = filteredItems.filter((item) => {
      const hasAllFilters = filters.every((filter) => {
        return (
          item.productName &&
          item.productName.toLowerCase().includes(filter.toLowerCase())
        );
      });
      return hasAllFilters;
    });
    setFilteredItems(filteredItemsWithFilters);
  }, [filters]);

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} home />
      <Navbar toggle={toggle} home />
      <SearchBar onChange={modifySearchTerm} />
      <FilterTags onChange={modifyFilters} />
      {searchTerm && (
        <Subtitle>
          {filteredItems.length} resultados para "{searchTerm}"
        </Subtitle>
      )}
      <ScrollableContainer style={{ marginLeft: 0 }}>
        <ProductContainer>
          {filteredItems.map((product, index) => (
            <ProductCard
              key={`product-${index}`}
              img={`/CrowStore/imgs/${product.images[0]}`}
              productName={product.name}
              price={product.price}
            />
          ))}
        </ProductContainer>
      </ScrollableContainer>
      <Footer />
    </>
  );
};

export default WrapSearch;
